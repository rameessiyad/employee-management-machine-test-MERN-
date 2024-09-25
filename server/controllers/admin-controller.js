const Admin = require('../models/admin-model');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

module.exports = {
    login: asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ f_username: username });
        if (!admin) return res.status(404).json({ message: "Invalid username" });

        //password comparison
        const passwordMatch = await bcrypt.compare(password, admin.f_pwd);
        if (!passwordMatch) return res.status(404).json({ message: "Invalid username or password" });

        // generate token
        generateToken(admin._id, res);

        res.status(200).json({ message: "Login Successful", user: admin });
    })
}