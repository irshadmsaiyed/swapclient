import React, { useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { useRouter } from 'next/router';

// import myImage from '../../img/irshad.png';

function UserProfile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const settings = [
    {
      label: 'Profile',
      fn: function () {
        // dispatch(logout());
      },
    },
    {
      label: 'Account',
      fn: function () {
        // dispatch(logout());
      },
    },
    {
      label: 'Dashboard',
      fn: function () {
        // dispatch(logout());
      },
    },
    {
      label: 'Logout',
      fn: function () {
        dispatch(logout());
        router.push('/');
      },
    },
  ];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ display: 'flex', flexGrow: 0 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          mr: 2,
          fontWeight: 400,
          fontSize: '1rem',
          fontStyle: 'normal',
          lineHeight: '42px',
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        {`${currentUser?.firstName || 'No'} ${currentUser?.lastName || 'User'}`}
      </Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
            // src="https://mui.com/static/images/avatar/2.jpg"
            // src={myImage}
            src="/user_image.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => {
              setting.fn();
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center">{setting.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserProfile;
