const Employee = require('../models/employee-model');
const asyncHandler = require('express-async-handler');

module.exports = {
    createEmployee: asyncHandler(async (req, res) => {
        const { f_image, f_name, f_email, f_mobile, f_designation, f_gender, f_course } = req.body;

        // email duplicate check
        const existingEmployee = await Employee.findOne({ f_email });
        if (existingEmployee) return res.status(400).json({ message: "Email already exists" });

        const newEmployee = Employee.create({
            f_image,
            f_name,
            f_email,
            f_mobile,
            f_designation,
            f_gender,
            f_course
        });

        res.status(201).json({ message: "Employee created" });
    })
}