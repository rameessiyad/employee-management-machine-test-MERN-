const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/admin-route');

const connectDB = require('./db/db');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/auth', adminRoute)

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
    connectDB();
})