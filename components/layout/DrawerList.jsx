import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// other import
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import menuItems from './MenuItems';
import Link from '../other/Link';

function DrawerList(props) {
  const { toggleDrawer } = props;
  return (
    <Box
      sx={{
        width: 250,
        // background: `linear-gradient(90deg, hsla(169, 76%, 48%, 1) 0%, hsla(67, 87%, 82%, 1) 100%)`,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', ml: 1.5, mt: 1.5 }}>
        <SchoolRoundedIcon
          color="primary"
          sx={{ marginRight: '4px', fontSize: '2.5rem' }}
        />
        <Typography
          noWrap
          component="div"
          color="primary"
          sx={{
            mr: 2,
            fontWeight: '600',
            fontSize: '1.5rem',
            lineHeight: '42px',
          }}
        >
          SWAP 1.0
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) =>
          item.text === 'Divider' ? (
            <Divider key={item.key} />
          ) : (
            <ListItem button key={item.text} component={Link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
}

export default DrawerList;
