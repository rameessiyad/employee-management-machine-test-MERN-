import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = ({ onUpdateEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [course, setCourse] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); // To hold the current employee image URL
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employee data when the component mounts
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`${baseUrl}/employee/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    // Pre-fill the form fields with existing employee data
                    setName(data.f_name);
                    setEmail(data.f_email);
                    setGender(data.f_gender);
                    setDesignation(data.f_designation);
                    setCourse(data.f_course);
                    setMobile(data.f_mobile);
                    setCurrentImage(data.f_image); // Set current image URL
                } else {
                    toast.error("Failed to fetch employee data.");
                }
            } catch (error) {
                toast.error("Something went wrong while fetching employee data.");
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchEmployeeData();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if all required fields are filled
        if (name && email && gender && designation && course && mobile) {
            const formData = new FormData();
            formData.append('f_name', name);
            formData.append('f_email', email);
            formData.append('f_gender', gender);
            formData.append('f_designation', designation);
            formData.append('f_course', course);
            formData.append('f_mobile', mobile);

            // Append the new image if available, otherwise append the current image URL
            if (image) {
                formData.append('f_image', image);
            } else {
                formData.append('f_image', currentImage);
            }

            try {
                const response = await fetch(`${baseUrl}/employee/edit/${id}`, {
                    method: 'PUT',
                    body: formData,
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setOpenSnackbar(true);
                    onUpdateEmployee(data); // Call the parent function to update the employee list
                    // Reset form fields
                    setName('');
                    setEmail('');
                    setGender('');
                    setDesignation('');
                    setCourse('');
                    setMobile('');
                    setImage(null);
                    setCurrentImage(data.f_image);

                    navigate('/dashboard/employee-list')
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Failed to update employee");
                }
            } catch (error) {
                console.log("Something went wrong")
            }
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    useEffect(() => {
        if (openSnackbar) {
            navigate('/dashboard/employee-list');
        }
    }, [openSnackbar, navigate]);



    // Close snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Show loading state until data is fetched
    if (loading) {
        return <Typography align="center">Loading...</Typography>;
    }

    return (
        <AdminLayout>
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h6" align="center">Edit Employee</Typography>

                {/* Display current employee image if available */}
                {currentImage && (
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                        <img
                            src={image ? URL.createObjectURL(image) : currentImage} // Show new image if uploaded
                            alt="Employee"
                            style={{
                                width: '50%',
                                height: 'auto',
                                borderRadius: '50%',
                                border: '2px solid #4caf50',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </Box>
                )}

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
                        Update Employee
                    </Button>
                </form>

                {/* Snackbar for success message */}
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Employee updated successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </AdminLayout>
    );
};

export default EditEmployee;
