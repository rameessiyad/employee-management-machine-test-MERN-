import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const drawerWidth = 260

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

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
        <Button variant="contained" sx={{ backgroundColor: '#FF6F61' }} onClick={handleLogout} >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar