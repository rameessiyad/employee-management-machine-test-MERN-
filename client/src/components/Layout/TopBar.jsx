import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const TopBar = () => {
  const drawerWidth = 260
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        background: 'linear-gradient(90deg, #4C8CBE 0%, #6C83CA 100%)',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Welcome Admin Panel
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: '#FF6F61' }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar