const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/admin-route');
const employeeRoute = require('./routes/employee-route');

const connectDB = require('./db/db');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

//end-points
app.use('/api/v1/auth', adminRoute)
app.use('/api/v1/employee', employeeRoute)

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
    connectDB();
})