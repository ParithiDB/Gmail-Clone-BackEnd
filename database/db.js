const mongoose = require('mongoose');

require('dotenv').config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 

const Connection = () => {
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.riyqjnx.mongodb.net/${process.env.DB_NAME}`;
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        mongoose.set('strictQuery', false);
        console.log('DATABASE CONNECTED SUCCESSFULLY');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message)
    }
}

module.exports = Connection;