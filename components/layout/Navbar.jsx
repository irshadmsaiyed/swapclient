import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import Drawer from './Drawer';
import Logo from './Logo';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';

function Navbar() {
  const isAdmin =
    useSelector((state) => state?.user?.currentUser?.isAdmin) || false;
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <AppBar
        position="static"
        // elevation={2}
        // sx={{ backgroundColor: '#0d47a1' }}
        // sx={{
        //   background: `linear-gradient(90deg, hsla(216, 96%, 56%, 1) 0%, hsla(178, 64%, 65%, 1) 100%)`,
        // }}
      >
        <Container maxWidth="false">
          <Toolbar disableGutters>
            {/* logo */}
            <Logo />

            {/* hamburger menu */}
            <Box flexGrow={1}>
              <IconButton
                size="large"
                onClick={isAdmin ? () => setOpenDrawer(!openDrawer) : null}
                color="inherit"
              >
                <MenuRoundedIcon sx={{ fontSize: '2.5rem' }} />
              </IconButton>
            </Box>

            {/* user's profile & menu */}
            <UserProfile />
          </Toolbar>
        </Container>
      </AppBar>

      {/* drawer */}
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
}

export default Navbar;
