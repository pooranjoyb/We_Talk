const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bp = require("body-parser");

const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: false}))

const server = http.createServer(app);
const rooms = new Set();

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.post('/saveRoom', (req, res) => {
  console.log(req.body)
  const { id } = req.body;
  rooms.add(id);
  res.send({ message: 'Room ID saved successfully' });
});

app.get('/checkRoom/:roomID', (req, res) => {
  const { roomID } = req.params;
  if (rooms.has(roomID)) {
    res.send({ exists: true });
  } else {
    res.send({ exists: false });
  }
});

app.get('/' , (req, res) => {
  console.log("Server Running Smoothly")
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
