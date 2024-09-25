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
    }),

    editEmployee: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        //image upload
        const imageUrl = req.file ? getFileUrl(req, req.file) : null;

        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            f_image: imageUrl,
            f_name: req.body.f_name || employee.f_name,
            f_email: req.body.f_email || employee.f_email,
            f_mobile: req.body.f_mobile || employee.f_mobile,
            f_designation: req.body.f_designation || employee.f_designation,
            f_gender: req.body.f_gender || employee.f_gender,
            f_course: req.body.f_course || employee.f_course
        }, { new: true });

        res.status(200).json({ message: "Employee updated", employee: updatedEmployee });
    })
}