import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Button, TextField, Box, TablePagination, Avatar, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../components/Layout/AdminLayout';

const EmployeeList = () => {
    // Sample data for employees
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            designation: 'Manager',
            mobile: '123-456-7890',
            course: 'BCA',
            createDate: '2024-01-15',
            image: 'https://via.placeholder.com/40', // Placeholder image URL
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            designation: 'HR',
            mobile: '987-654-3210',
            course: 'MCA',
            createDate: '2024-02-20',
            image: 'https://via.placeholder.com/40',
        },
        {
            id: 3,
            name: 'Alex Johnson',
            email: 'alex@example.com',
            designation: 'Sales',
            mobile: '555-555-5555',
            course: 'BSC',
            createDate: '2024-03-05',
            image: 'https://via.placeholder.com/40',
        },
        // Add more employees here...
    ]);

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    // Handle delete employee
    const handleDelete = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };

    // Filtered employees based on search query
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', height: '100vh' }}>
                <Box sx={{ width: '100%', mt: 2 }}>
                    {/* Top bar with total count, search, and create button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Total Employees: {filteredEmployees.length}</Typography>

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
                                    <TableCell>ID</TableCell>
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
                                        <TableRow key={employee.id}>
                                            <TableCell>
                                                <Avatar alt={employee.name} src={employee.image} />
                                            </TableCell>
                                            <TableCell>{employee.id}</TableCell>
                                            <TableCell>{employee.name}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.mobile}</TableCell>
                                            <TableCell>{employee.designation}</TableCell>
                                            <TableCell>{employee.course}</TableCell>
                                            <TableCell>{employee.createDate}</TableCell>
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

export default EmployeeList;
