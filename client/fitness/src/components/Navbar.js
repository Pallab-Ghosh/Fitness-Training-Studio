import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Stack} from '@mui/material'
import Logo from '../assets/images/Logo.png';
import { Dropdown } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { login_handler, programme_data } from '../App';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {
  const navigate=useNavigate()
  const{programme_detail,set_programme}=useContext(programme_data)

  console.log(programme_detail)

  const handle_signout=(e)=>{
    e.preventDefault();
    //alert('sign out')
     localStorage.removeItem("userdata_with_token")
      navigate('/')
  }
  

  return (
 
    <Stack direction="row" justifyContent="space-around" sx={{ gap :{sm:'45px', xs:'15px'} , mt: {sm:'32px', xs:'20px'}, justifyContent:'none'}}  px="20px" >

      <Link to="/home">
       <img src={Logo} alt="logo" style={{
        width:'48px',height:'48px',margin:'0px 20px'}}/>
      </Link>

      <Stack direction="row" gap="30px" fontSize="24px" alignItems="flex-end" >
        <Link to="/home"
         style={{textDecoration:'none',color:'#3A1212', borderBottom:'3px solid #FF2625'}}>
    
          Home</Link>

       {/*  <a href="/home#exercises" style={{textDecoration:'none', color:'#3A1212' }}> Exercises </a>*/}
         
       <Dropdown title="Accounts Summary" style={{textDecoration:'none',color:'#3A1212', borderBottom:'3px solid #FF2625'}}>

        <Dropdown.Item as={Link} to="/home/accountDetails">
         <AccountBoxIcon color="error" /> Account Details
        </Dropdown.Item>

        <Dropdown.Item as={Link} to="/home/get_admission" style={{textDecoration:'none',color:'#3A1212'}}>
      <SubscriptionsIcon color='error' />  Enrollment
    </Dropdown.Item>

        <Dropdown.Item  style={{textDecoration:'none',color:'#3A1212'}} onClick={handle_signout}>
          <ExitToAppIcon color='error'/>  Sign Out
        </Dropdown.Item>

    </Dropdown>

    
         
      </Stack>
    </Stack>
  )
}
