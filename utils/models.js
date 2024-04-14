const mongoose = require('mongoose');

const userActivity = new mongoose.Schema({
    username: String,
    roomJoined: String,
});

const roomSchema = new mongoose.Schema({
    roomId: String
})

const chatSchema = new mongoose.Schema({
    user: String,
    msg: [String],
});

const UserActivity = mongoose.model('user', userActivity);
const Room = mongoose.model('room', roomSchema)
const Chat = mongoose.model('chat', chatSchema)


module.exports = { UserActivity, Room, Chat };