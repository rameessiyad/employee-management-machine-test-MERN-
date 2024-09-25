import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Snackbar,
    Alert,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import AdminLayout from '../components/Layout/AdminLayout';

const AddEmployee = ({ onAddEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(''); // State for gender
    const [designation, setDesignation] = useState(''); // State for designation
    const [course, setCourse] = useState(''); // State for course
    const [mobile, setMobile] = useState(''); // State for mobile number
    const [image, setImage] = useState(null); // State for image
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (name && email && gender && designation && course && mobile && image) {
            const newEmployee = {
                id: Date.now(), // Generate a unique ID (could be improved)
                name,
                email,
                gender,
                designation,
                course,
                mobile,
                image,
            };

            onAddEmployee(newEmployee); // Call the function to add employee
            setOpenSnackbar(true); // Show success message
            // Reset fields
            setName('');
            setEmail('');
            setGender('');
            setDesignation('');
            setCourse('');
            setMobile('');
            setImage(null);
        }
    };

    // Close snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <AdminLayout>
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h6" align="center">Add New Employee</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormControl component="fieldset" margin="normal" required>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal" required>
                        <InputLabel>Designation</InputLabel>
                        <Select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        >
                            <MenuItem value="HR">HR</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal" required>
                        <InputLabel>Course</InputLabel>
                        <Select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                        >
                            <MenuItem value="BCA">BCA</MenuItem>
                            <MenuItem value="MCA">MCA</MenuItem>
                            <MenuItem value="BSC">BSC</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <TextField
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Save the selected image file
                        fullWidth
                        margin="normal"
                        inputProps={{ accept: 'image/*' }} // Accept only image files
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Employee
                    </Button>
                </form>

                {/* Snackbar for success message */}
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Employee added successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </AdminLayout>
    );
};

export default AddEmployee;
