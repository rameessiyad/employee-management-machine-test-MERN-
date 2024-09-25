import React, { memo, useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Button, TextField, Box, TablePagination, Avatar, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../components/Layout/AdminLayout';
import { baseUrl } from '../baseUrl';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Fetch employees from API
    const getEmployees = async () => {
        try {
            const response = await fetch(`${baseUrl}/employee/list`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            toast.error(error.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    // Handle delete employee
    const handleDelete = async (id) => {
        const response = await fetch(`${baseUrl}/employee/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
            getEmployees();
        }

        if (!response.ok) {
            toast.error(data.message);
        }
    };

    // Filter employees based on search query (case-insensitive)
    const filteredEmployees = employees.filter((employee) =>
        employee.f_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.f_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.f_mobile.includes(searchQuery)
    );

    return (
        <AdminLayout>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', height: '100vh' }}>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Total Employees: {filteredEmployees.length}</Typography>

                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search Employee"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ mr: 2 }}
                        />

                        <Button variant="contained" color="primary">Create Employee</Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Course</TableCell>
                                    <TableCell>Create Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((employee) => (
                                        <TableRow key={employee._id}>
                                            <TableCell>
                                                <Avatar alt={employee.f_name} src={employee.f_image} />
                                            </TableCell>
                                            <TableCell>{employee.f_name}</TableCell>
                                            <TableCell>{employee.f_email}</TableCell>
                                            <TableCell>{employee.f_mobile}</TableCell>
                                            <TableCell>{employee.f_designation}</TableCell>
                                            <TableCell>{employee.f_course}</TableCell>
                                            <TableCell>{employee.createdAt}</TableCell>
                                            <TableCell>
                                                <Link to={`/dashboard/edit-employee/${employee._id}`}>
                                                    <IconButton color="primary">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton color="secondary" onClick={() => handleDelete(employee._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredEmployees.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>
        </AdminLayout>
    );
};

export default memo(EmployeeList);
