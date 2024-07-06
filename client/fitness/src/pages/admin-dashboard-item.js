
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
import { useNavigate } from 'react-router-dom';


export const DrawerList =({sidebarOpen , toggleSidebar})=>{

  const navigate=useNavigate();

  const handle_signout =()=>{
    localStorage.removeItem("userdata_with_token");
    console.log('clcik')
    window.location.href='/';
 }

      return(
    <Box sx={{ width:180 ,maxWidth: 360, display:'flex' , justifyContent:'flex-start' }} role="presentation" onClick={toggleSidebar}>
      <List sx={{bgcolor: 'background.paper' , display:'flex', width:'100%', marginRight:'5px'}}>
         
          <ListItem disablePadding sx={{display:'flex' , flexDirection:'column' , bgcolor:'ButtonFace', width:'100%', alignItems:'flex-start'}}>
            <ListItemButton onClick={()=>navigate('/signin/admin_login/dashboard/home')}>
              <ListItemIcon>
                 <HomeIcon sx={{height:'20px' , width:'20px'}} />
              </ListItemIcon>
              <ListItemText primary="Home"  primaryTypographyProps={{fontSize: 15}} />
            </ListItemButton>

            <ListItemButton onClick={()=>navigate('/signin/admin_login/dashboard/settings')}>
              <ListItemIcon>
                 <AnalyticsIcon sx={{height:'20px' , width:'20px'}}/>
              </ListItemIcon>
              <ListItemText primary="Analytics" primaryTypographyProps={{fontSize: 15}} />
            </ListItemButton>

            <ListItemButton onClick={handle_signout}>
              <ListItemIcon>
                 <ExitToAppIcon sx={{height:'20px' , width:'20px'}}/>
              </ListItemIcon>
              <ListItemText primary="Exit"   primaryTypographyProps={{fontSize: 15}} />
            </ListItemButton>
          </ListItem>
      </List>
 
       
    </Box>
  )
}