import React, { useEffect, useState } from 'react';
import './Dasboard.css'
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import {Box, Button, IconButton, Typography} from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//https://charts.mongodb.com/charts-fitness_tracker_db-dtmap

//92ecd971-3954-4b7e-becf-48c60c5dbeec


 

 const Admin_Dashboard = () => {
  const navigate=useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const[user_account_details,set_user_details]=useState({})
  const{firstname,lastname,username,address,password,mobile,email,course,subscription_date,price_of_course}={...user_account_details};

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`)
    .then((res)=>{
      set_user_details(res.data)
    })
  },[])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
   <>
 
    <div style={{height:'100px',backgroundColor:'slateblue'}}>
    <Button variant='contained' size='small' color='error' onClick={toggleSidebar}>Menu</Button>
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
    <div className="logo">Dashboard</div>
   <Typography variant='h5' sx={{mb:4}}> <AdminPanelSettingsIcon/>{`${firstname} ${lastname}`}</Typography>
    <ul className="menu">
    <li className="menu-item"><HomeIcon fontSize='medium' /><Link style={{color:'white'}}>Home</Link>  </li>
    <li className="menu-item"><AccountCircleIcon fontSize='medium' /><Link style={{color:'white'}}>Account Details</Link></li>
    <li className="menu-item"><AnalyticsIcon fontSize='medium' /><Link style={{color:'white'}}>Analytics</Link></li>
    <li className="menu-item"><ExitToAppIcon fontSize='medium' /><Link style={{color:'white'}}>Signout</Link></li>
    </ul>
  </div>

   <Typography variant='h3' color='white' sx={{ml:'60px'}}>  Dashboard </Typography>
    </div>

    <iframe 
    src="https://charts.mongodb.com/charts-fitness_tracker_db-dtmap/embed/dashboards?id=92ecd971-3954-4b7e-becf-48c60c5dbeec&theme=dark&autoRefresh=true&maxDataAge=60&showTi
    tleAndDesc=false&scalingWidth=fixed&scal
    ingHeight=fixed&&attribution=false"></iframe>
    </>
  );
};

export default Admin_Dashboard;






