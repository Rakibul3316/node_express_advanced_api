const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Router Files
const bootcamps = require('./routes/bootcamps');



// Load evn vars
dotenv.config({ path: './config/config.env' });

// Initialize Application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Bootcamp roters
app.use('/api/v1/bootcamps', bootcamps)


// Port 
const PORT = process.env.PORT || 5000;

// Server Create
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`))
