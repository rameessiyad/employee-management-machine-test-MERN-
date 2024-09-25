import React from 'react';
import { StyledDrawer } from '../styled/styled';
import { Box, Divider, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const SideBar = () => {
    return (
        <StyledDrawer variant="permanent" anchor="left">
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FF6F61' }}>
                            Admin Menu
                        </Typography>
                    </ListItem>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
                    <ListItem button component={Link} to="/dashboard" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                        <ListItemText primary="Dashboard" sx={{ color: 'white' }} /> 
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/employee-list" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                        <ListItemText primary="Employee List" sx={{ color: 'white' }} /> 
                    </ListItem>
                    <ListItem button component={Link} to="/dashboard/add-employee" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                        <ListItemText primary="Create Employee" sx={{ color: 'white' }} /> 
                    </ListItem>
                </List>
            </Box>
        </StyledDrawer>
    );
}

export default SideBar;
