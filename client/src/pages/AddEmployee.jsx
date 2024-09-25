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
import { baseUrl } from '../baseUrl';
import { toast } from 'react-hot-toast'

const AddEmployee = ({ onAddEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [course, setCourse] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all required fields are filled
        if (name && email && gender && designation && course && mobile && image) {
            const formData = new FormData();
            formData.append('f_name', name);
            formData.append('f_email', email);
            formData.append('f_gender', gender);
            formData.append('f_designation', designation);
            formData.append('f_course', course);
            formData.append('f_mobile', mobile);
            formData.append('f_image', image);

            try {
                const response = await fetch(`${baseUrl}/employee/create`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setOpenSnackbar(true);
                    // Reset form fields
                    setName('');
                    setEmail('');
                    setGender('');
                    setDesignation('');
                    setCourse('');
                    setMobile('');
                    setImage(null);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(data.messgae || "Something went wrong. Please try again later.");
            }
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
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal" required>
                        <InputLabel>Designation</InputLabel>
                        <Select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        >
                            <MenuItem value="HR">HR</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
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
                        onChange={(e) => setImage(e.target.files[0])}
                        fullWidth
                        margin="normal"
                        inputProps={{ accept: 'image/*' }}
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
