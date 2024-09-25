import React from 'react'
import { StyledDrawer } from '../styled/styled'
import { Box, Divider, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'

const SideBar = () => {
    return (
        <StyledDrawer
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#FF6F61' }}>
                            Admin Menu
                        </Typography>
                    </ListItem>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
                    {['Dashboard', 'Employee List', 'Create Employee'].map((text) => (
                        <ListItem button key={text} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </StyledDrawer>
    )
}

export default SideBar