import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate, useLocation } from 'react-router-dom';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const routes = [
  '/signin/admin_login/dashboard/home',
  '/signin/admin_login/dashboard',
  '/signin/admin_login/dashboard/settings'
];

export const DrawerList = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("userdata_with_token");
    console.log('click');
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ width: 180, maxWidth: 360, display: 'flex', justifyContent: 'flex-start' }} role="presentation" onClick={toggleSidebar}>
      <List sx={{ bgcolor: 'background.paper', display: 'flex', width: '100%', marginRight: '5px' }}>
        <ListItem disablePadding sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'ButtonFace', width: '100%', alignItems: 'flex-start' }}>
          <ListItemButton
            onClick={() => navigate('/signin/admin_login/dashboard/home')}
            sx={{ bgcolor: isActive('/signin/admin_login/dashboard/home') ? 'lightblue' : 'inherit' }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ height: '20px', width: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontSize: 15 }} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate('/signin/admin_login/dashboard')}
            sx={{ bgcolor: isActive('/signin/admin_login/dashboard') ? 'lightblue' : 'inherit' }}
          >
            <ListItemIcon>
              <AnalyticsIcon sx={{ height: '20px', width: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Analytics" primaryTypographyProps={{ fontSize: 15 }} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate('/signin/admin_login/dashboard/settings')}
            sx={{ bgcolor: isActive('/signin/admin_login/dashboard/settings') ? 'lightblue' : 'inherit' }}
          >
            <ListItemIcon>
              <SubscriptionsIcon sx={{ height: '20px', width: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Subscription" primaryTypographyProps={{ fontSize: 15 }} />
          </ListItemButton>

          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ height: '20px', width: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Exit" primaryTypographyProps={{ fontSize: 15 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
