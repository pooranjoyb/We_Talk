const mongoose = require('mongoose');

const Connection = () => {
    const MONGODB_URI = 'mongodb://localhost:27017'

    mongoose.set('strictQuery', false);
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully");
    })
    mongoose.connection.on('disconnected', () => {
        console.log("Database Disconnected");
    })

    mongoose.connection.on('error', () => {
        console.log('Error connecting the database');
    })
}

module.exports = Connection;