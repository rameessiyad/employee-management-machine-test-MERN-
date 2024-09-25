import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ padding: '2rem', marginTop: '3rem' }}>
                    <Typography variant="h5" align='center' gutterBottom sx={{ fontWeight: 'bold' }}>
                        Login
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            variant='outlined'
                            fullWidth
                            required
                            margin='normal'
                        />

                        <TextField
                            label="Password"
                            variant='outlined'
                            type="password"
                            fullWidth
                            required
                            margin='normal'
                        />

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            sx={{ marginTop: '1.5rem' }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>

    )
}

export default LoginPage