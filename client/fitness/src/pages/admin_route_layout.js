import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { DrawerList } from './admin-dashboard-item';

export default function AdminRouteLayout({children , sidebarOpen  , toggleSidebar}) {

  
  return (
    <div style={{display:'flex'}}>
         <div>
                <Drawer open={sidebarOpen} onClose={toggleSidebar}>
                    <DrawerList sidebarOpen   toggleSidebar={toggleSidebar}   />
                </Drawer>
         </div>
           <div>
              {children}
           </div>
    </div>
  );
}
