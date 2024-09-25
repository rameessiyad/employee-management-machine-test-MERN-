const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    f_image: {
        type: String,
    },
    f_name: {
        type: String,
        required: true
    },
    f_email: {
        type: String,
        required: true
    },
    f_mobile: {
        type: String,
        required: true
    },
    f_designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    f_gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    f_course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        requried: true
    }

},
    { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;