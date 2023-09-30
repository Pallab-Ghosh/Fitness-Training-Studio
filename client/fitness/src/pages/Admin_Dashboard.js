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
import MailIcon from '@mui/icons-material/Mail';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
//https://charts.mongodb.com/charts-fitness_tracker_db-dtmap

//92ecd971-3954-4b7e-becf-48c60c5dbeec


const get_full_year_and_time=()=>{
  const currentDate = new Date();

const year = currentDate.getFullYear(); 
const month = currentDate.getMonth() + 1; 
const day = currentDate.getDate(); 

const hours = currentDate.getHours(); 
const minutes = currentDate.getMinutes(); 
const seconds = currentDate.getSeconds(); 


const fullDateTimeString = `${year}-${month}-${day}`
const fullTime=`${hours}:${minutes}:${seconds}`;

return {date_details:fullDateTimeString,time_details:fullTime}

}


 

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

  const handle_signout =()=>{
     localStorage.removeItem("userdata_with_token");
     console.log('clcik')
     window.location.href='/';
  }

  const data_and_time=get_full_year_and_time();

  const {date_details,time_details}=data_and_time;
  return (
   <>
    <div style={{height:'90px',backgroundColor:'#013680'}}>
    <Typography variant='h2' color='white' sx={{ml:100}}>  Dashboard </Typography>
 
    <Box display='flex' flexDirection='row'>
    <Typography><Button variant='contained' size='large' style={{color:'black',backgroundColor:' #b1cef0'}} fullWidth onClick={toggleSidebar} sx={{ml:0.5}}><DensitySmallOutlinedIcon/></Button></Typography>
    </Box>

    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

        <div className="logo">Admin Details</div>
        <Typography variant='h5' sx={{mb:1}}> <AdminPanelSettingsIcon/>{`${firstname} ${lastname}`}</Typography>
        <Typography variant='h6' sx={{mt:0.5,ml:3,mb:4}}><MailIcon/>{`${email}`}</Typography>
        <ul className="menu">
        <li className="menu-item"><HomeIcon fontSize='medium' /><a style={{color:'white'}} href='/signin/admin_login/dashboard/home'>Home</a>  </li>
        <li className="menu-item"><AnalyticsIcon fontSize='medium' /><a style={{color:'white'}} href='/signin/admin_login/dashboard/settings'>Settings</a></li>
        <li className="menu-item"><ExitToAppIcon fontSize='medium' /><Link style={{color:'white'}} onClick={handle_signout}>Signout</Link></li>
        </ul>
        <Typography variant='h5' sx={{mt:45,fontSize:'18px'}}>Today</Typography>
        <Typography variant='h5' sx={{mt:1,fontSize:'18px'}}>{`${date_details}    ${time_details}`}</Typography>
        <Typography variant='h5' sx={{mt:4,fontSize:'18px'}}>Fitness-Training-Studio</Typography>
  </div>

    </div>
    
    <div className='dashboards'>
    <iframe 
    src="https://charts.mongodb.com/charts-fitness_tracker_db-dtmap/embed/dashboards?id=92ecd971-3954-4b7e-becf-48c60c5dbeec&theme=dark&autoRefresh=true&maxDataAge=60&showTi
    tleAndDesc=false&scalingWidth=fixed&scal
    ingHeight=fixed&&attribution=false"></iframe>
    </div>
  
    </>
  );
};

export default Admin_Dashboard;






