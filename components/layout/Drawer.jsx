import React from 'react';
// import PropTypes from 'prop-types';
import { Box, SwipeableDrawer } from '@mui/material';

import DrawerList from './DrawerList';

function Drawer({ openDrawer, setOpenDrawer }) {
  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(false);
  };

  return (
    <Box>
      <SwipeableDrawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </Box>
  );
}

// Drawer.propTypes = {
//   openDrawer: PropTypes.bool.isRequired,
//   setOpenDrawer: PropTypes.func.isRequired,
// };

export default Drawer;
