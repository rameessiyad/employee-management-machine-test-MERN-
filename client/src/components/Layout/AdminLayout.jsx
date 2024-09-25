import { Box } from '@mui/material'
import React from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'

const AdminLayout = ({children}) => {
    const drawerWidth = 260
    return (
        <Box sx={{ display: 'flex' }}>

            {/* top app bar */}
            <TopBar />

            {/* sidebar */}
            <SideBar />

            {/* main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#F4F5FA',
                    p: 3,
                    ml: `${drawerWidth}px`,
                    mt: 8,
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>

        </Box>
    )
}

export default AdminLayout