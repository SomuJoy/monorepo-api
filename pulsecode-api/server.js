const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
