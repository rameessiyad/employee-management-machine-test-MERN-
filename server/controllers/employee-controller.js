const Employee = require('../models/employee-model');
const asyncHandler = require('express-async-handler');
const { getFileUrl } = require('../utils/image-upload');

module.exports = {
    createEmployee: asyncHandler(async (req, res) => {
        const { f_name, f_email, f_mobile, f_designation, f_gender, f_course } = req.body;

        // email duplicate check
        const existingEmployee = await Employee.findOne({ f_email });
        if (existingEmployee) return res.status(400).json({ message: "Email already exists" });

        //image upload
        const imageUrl = req.file ? getFileUrl(req, req.file) : null;

        const newEmployee = Employee.create({
            f_name,
            f_email,
            f_mobile,
            f_designation,
            f_gender,
            f_course,
            f_image: imageUrl
        });

        res.status(201).json({ message: "Employee created" });
    }),

    listEmployees: asyncHandler(async (req, res) => {
        const employees = await Employee.find({}).sort({ createdAt: -1 });
        res.status(200).json(employees);
    })
}