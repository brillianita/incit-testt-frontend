import * as React from 'react';
import {
  AppBar,
  Box, Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


export default function MenuNavbar() {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const idUser = getCookie('id');
    console.log('idUser', idUser)
    const response = await fetch(`http://localhost:3300/logout/${idUser}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const responseData = await response.json()
    console.log('responseData Delete', responseData);
    if(responseData.status === 'fail') {
      alert(responseData.message);
    } else {
      navigate('/login')
    }
    return responseData
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile', { replace: true });
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: '#fff' }}>
        <Toolbar>
          <Typography color="#000" fontWeight='bold' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="#000"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box >
  );
}