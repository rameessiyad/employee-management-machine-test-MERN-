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

const EmployeeList = () => {

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [employees, setEmployees] = useState([]);

    // Search input state
    const [searchQuery, setSearchQuery] = useState('');

    // Handle pagination change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //get employees
    const getEmployees = async () => {
        try {
            const response = await fetch(`${baseUrl}/employee/list`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data);
            setEmployees(data);
        } catch (error) {
            toast.error(error.message || 'Something went wrong!');
            console.log(error);
        }
    }

    useEffect(() => {
        getEmployees();
    },[])

    // Handle delete employee
    const handleDelete = (id) => {
        toast.success('Employee deleted successfully');
    };

    // Filtered employees based on search query
    // const filteredEmployees = employees.filter((employee) =>
    //     employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <AdminLayout>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', height: '100vh' }}>
                <Box sx={{ width: '100%', mt: 2 }}>
                    {/* Top bar with total count, search, and create button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Total Employees: 2</Typography>

                        {/* Search input */}
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search Employee"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ mr: 2 }}
                        />

                        {/* Create employee button */}
                        <Button variant="contained" color="primary">Create Employee</Button>
                    </Box>

                    {/* Employee table */}
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
                                {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((employee) => (
                                        <TableRow key={employee._id}>
                                            <TableCell>
                                                <Avatar alt={employee.name} src={employee.f_image} />
                                            </TableCell>
                                            <TableCell>{employee.f_name}</TableCell>
                                            <TableCell>{employee.f_email}</TableCell>
                                            <TableCell>{employee.f_mobile}</TableCell>
                                            <TableCell>{employee.f_designation}</TableCell>
                                            <TableCell>{employee.f_course}</TableCell>
                                            <TableCell>{employee.createdAt}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleDelete(employee.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    {/* <TablePagination
                        component="div"
                        count={filteredEmployees.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Box>
            </Box>
        </AdminLayout>
    );
};

export default memo(EmployeeList);
