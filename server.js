const express = require('express');
const dotenv = require('dotenv')

// Load evn vars
dotenv.config({ path: './config/config.env' });

// Initialize Application
const app = express();

// Port 
const PORT = process.env.PORT || 5000;

// Server Create
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`))
