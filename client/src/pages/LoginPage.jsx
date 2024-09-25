import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import toast from 'react-hot-toast';
import { setCredentials } from '../redux/slices/authSlice';

const LoginPage = () => {
    const [formData, setformData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await response.json();

            if (!response.ok) {
                setLoading(false)
                toast.error(data.message);
                return;
            }

            dispatch(setCredentials(data.user));
            navigate('/dashboard');
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ padding: '2rem', marginTop: '3rem' }}>
                    <Typography variant="h5" align='center' gutterBottom sx={{ fontWeight: 'bold' }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant='outlined'
                            fullWidth
                            required
                            margin='normal'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <TextField
                            label="Password"
                            variant='outlined'
                            type="password"
                            fullWidth
                            required
                            margin='normal'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Button
                            disabled={loading}
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            sx={{ marginTop: '1.5rem' }}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>

    )
}

export default LoginPage