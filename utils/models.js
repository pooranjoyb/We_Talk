const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    users: [String],
    chats: [String]
});
const chat = mongoose.model('chat', chatSchema)

exports.chat = chat;