import React from 'react'
import AdminLayout from '../components/Layout/AdminLayout'
import { Box, Typography } from '@mui/material'

const AdminHomePage = () => {
    return (
        <AdminLayout>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '18rem', height: '100vh' }}>
                <Typography variant='h4' sx={{ color: '#2E3B55', fontWeight: 'bold' }}>
                    Welcome to the Admin Dashboard
                </Typography>
            </Box>
        </AdminLayout>
    )
}

export default AdminHomePage