const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db')


// Load evn vars
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Router Files
const bootcamps = require('./routes/bootcamps');

// Initialize Application
const app = express();

// Body Parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Bootcamp roters
app.use('/api/v1/bootcamps', bootcamps)


// Port 
const PORT = process.env.PORT || 5000;

// Server Create
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold)
)

// Handle unhandled promis rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})
