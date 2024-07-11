import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

export default function PaperCard({all_subscriber , all_visitor}) {
  return (
    <Box sx={{ display: 'flex',flexWrap: 'wrap','& > :not(style)': {
          marginLeft: 10,
          marginTop : 10,
          marginBottom:10,
          marginRight:10,
          width: 370,
          height: 128,
          borderRadius:'20px'
        },
      }}
    >

      <Paper elevation={24}>
          <div style={{display:'flex' , justifyContent :'flex-start',marginTop:'26px' }}>
              <SubscriptionsIcon sx={{height:'30px' , width:'40px',marginRight:'5px',marginLeft:'10px'}}/>
               <p style={{fontSize:'25px'}}> {all_subscriber}</p>
          </div>
          
           <p style={{fontSize:'15px',marginLeft:'14px',marginTop:'10px'}}>Total number of active members</p>
        </Paper> 

        <Paper elevation={24}>
          <div style={{display:'flex' , justifyContent :'flex-start',marginTop:'26px' }}>
              <SubscriptionsIcon sx={{height:'30px' , width:'40px',marginRight:'5px',marginLeft:'10px'}}/>
               <p style={{fontSize:'25px'}}> {all_visitor}</p>
          </div>
          
           <p style={{fontSize:'15px',marginLeft:'12px',marginTop:'10px'}}>Total number of visitors </p>
        </Paper> 
      <Paper elevation={24} />
    </Box>
  );
}
