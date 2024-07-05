
import * as React from 'react';
import Box from '@mui/material/Box';
 

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Divider } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export const DrawerList =({sidebarOpen , toggleSidebar})=>{
      return(
    <Box sx={{ width:180 , display:'flex' , justifyContent:'flex-start' }} role="presentation" onClick={toggleSidebar}>
      <List sx={{bgcolor: 'background.paper' , }}>
         
          <ListItem disablePadding sx={{display:'flex' , flexDirection:'column'}}>
            <ListItemButton>
              <ListItemIcon>
                 <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                 <AnalyticsIcon/>
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                 <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary="Exit" />
            </ListItemButton>

          </ListItem>
      </List>
 
       
    </Box>
  )
}