const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bp = require("body-parser");
const Connection = require('./utils/db.js')
const { UserActivity, Room, Chat } = require('./utils/models.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }))

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection',  (socket) => {
  console.log('A user connected');

  socket.on('message', async (msg) => {
    console.log('Message received:', msg);


    try {
      const chatExists = await Chat.exists({ user: msg?.user });
      if (chatExists) {
        const updatedChat = await Chat.updateOne(
          { user: msg?.user },
          { $push: { msg: msg?.text } }
        );

        console.log("Old chat updated", updatedChat);
      } else {
        const newChat = new Chat({
          user: msg?.user,
          msg: [msg?.text]
        });

        await newChat.save();
        console.log("New chat saved");
      }

      io.emit('message', msg);
    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit('error', { message: 'Failed to process message' });
    }

  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.post('/saveRoom', (req, res) => {
  const { id } = req.body;

  console.log(id)

  Room.exists({ roomId: id })
    .then(exists => {
      if (exists) {
        res.send({ res: false });
      } else {
        const room = new Room({
          roomId: id
        })
        room.save();
        res.send({ res: true });
      }
    })
    .catch(error => {
      console.error('Error checking room existence:', error);
    });

});

app.get('/checkRoom/:roomID/:usn', (req, res) => {
  const { roomID, usn } = req.params;

  Room.exists({ roomId: roomID })
    .then(exists => {
      if (exists) {

        const userActivity = new UserActivity({
          username: usn,
          roomJoined: roomID
        })

        userActivity.save();
        console.log('saved')

        res.send({ exists: true });
      } else {
        res.send({ exists: false });
      }
    })
    .catch(error => {
      console.error('Error checking room existence:', error);
    });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Connection();
});
