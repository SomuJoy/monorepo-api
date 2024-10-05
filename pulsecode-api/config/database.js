const mongoose = require('mongoose');
require('dotenv').config();

// Standard MongoDB connection URI
const dbURI = 'mongodb://localhost:27017/pulsecode'; // Change 'your_database_name' as needed

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
