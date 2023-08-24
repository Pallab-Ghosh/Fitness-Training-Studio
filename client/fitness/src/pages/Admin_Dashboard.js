import React, { useEffect } from 'react';
import './Dasboard.css'
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import {Box, Button, Typography} from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
//https://charts.mongodb.com/charts-fitness_tracker_db-dtmap

//92ecd971-3954-4b7e-becf-48c60c5dbeec


 

 const Admin_Dashboard = () => {
  const navigate=useNavigate()
  return (
   <>
    <div style={{height:'100px',backgroundColor:'slateblue'}}>
   <Typography variant='h3' color='white' sx={{ml:'60px'}}> 
   <Button variant='contained' size='larger' color='error' onClick={()=>navigate(-1)}>Go Back</Button>
    Admin Dashboard
   </Typography>
    </div>
    <iframe 
    
    src="https://charts.mongodb.com/charts-fitness_tracker_db-dtmap/embed/dashboards?id=92ecd971-3954-4b7e-becf-48c60c5dbeec&theme=light&autoRefresh=true&maxDataAge=3600&showTitleA
    ndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
    </>
   
  );
};

export default Admin_Dashboard;






