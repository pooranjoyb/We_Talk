const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bp = require("body-parser");
const Connection = require('./utils/db.js')

const app = express();
const PORT = process.env.PORT || 5000;

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
  const { id } = req.body;
  rooms.add(id);
  res.send({ res: true });
});

app.get('/checkRoom/:roomID', (req, res) => {
  const { roomID } = req.params;
  if (rooms.has(roomID)) {
    res.send({ exists: true });
  } else {
    res.send({ exists: false });
  }
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Connection();
});
