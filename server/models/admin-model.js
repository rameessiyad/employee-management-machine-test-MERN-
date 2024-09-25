const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    f_sno: {
        type: Number,
        required: true,
        unique: true
    },
    f_username: {
        type: String,
        required: true
    },
    f_pwd: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;