import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { Router, Routes, useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { login_data, login_handler, token_data } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme();


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  
export const Login_email = () => {

 const[email_and_otp,setemail_andotp]=useState({email:'',otp:''})
 const navigate=useNavigate()
 const {user_token,set_token}=useContext(token_data)
  const[sendind_otp,set_sending_otp]=useState(false);
  const[validating_otp,set_validating_otp]=useState(false);

  const {user_email , set_email} = useContext(login_data)


  const handle_click=(e)=>{


     e.preventDefault();
     if(email_and_otp.email!='')
     {
      set_sending_otp(true)
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login_email_with_email`,email_and_otp)
      .then((resolve)=>{
        console.log(resolve.data)
        if(resolve.data.id==1)
        {
         
        //alert('Otp sent successfully...')
        set_sending_otp(false)
        toast.warning('OTP Sent Successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored",
          style:{color:'black'}
          });
        }
 
      else if(resolve.data.id===2)
      {

       //alert('Error')
       toast.warning('Error', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        style:{color:'black'}
        });
      }
 
        else
        {
         
        // alert('Invalid User!!')
        toast.warning('Invalid User', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored",
          style:{color:'black'}
          });
        }
      })
      .catch((err)=>{
        console.log(err)
      })
      setemail_andotp({...email_and_otp,email:''})
     }
     else
     {
      toast.warning('Please Provide Email', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        style:{color:'black'}
        });
     }

  }


const handle_Otp=async(e)=>{
  e.preventDefault();


  if(email_and_otp.otp==='')
  {
   // alert('Please provide Otp') 
    toast.warning('Please Provide OTP', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"colored",
      style:{color:'black'}
      });
  }

  else if(email_and_otp.otp!='')
  {
    set_validating_otp(true)
   const fetch_data=await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/verify_email_with_email`,email_and_otp)
   console.log(fetch_data.data)
   if(fetch_data.data.token)
   {
    set_validating_otp(false)
     const{token}={...fetch_data.data}
     console.log("token from api",token)
     localStorage.setItem("userdata_with_token",JSON.stringify(token))
     localStorage.setItem('user_login_email', fetch_data.data.user.email)
     set_email( localStorage.getItem('user_login_email', fetch_data.data.user.email))
     set_token(JSON.stringify(token))
    
     window.location.href='/home'
   }
    
  
  }
   setemail_andotp({...email_and_otp,otp:''})
}

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            inputProps={{style: {fontSize: 15}}}
            type="text"
            autoFocus
           value={email_and_otp.email}
            onChange={(e)=>setemail_andotp({...email_and_otp,email:e.target.value})}
          />
        
         
        <Button onClick={handle_click} disabled={sendind_otp} fullWidth variant="contained" sx={{ mt: 3, mb: 2,borderRadius:'12px',fontSize:'15px' }}>
          {sendind_otp ? 'Sending OTP...' :'Send Otp'}  
        </Button>

        <TextField
        margin="normal"
        required
        fullWidth
        name="otp"
        label="Otp"
        type="text"
        inputProps={{style: {fontSize: 15}}}
        id="otp"
       value={email_and_otp.otp}
        onChange={(e)=>setemail_andotp({...email_and_otp,otp:e.target.value})}/>

       <Button type="submit" disabled={validating_otp}  onClick={handle_Otp} fullWidth variant="contained" sx={{ mt: 3, mb: 2 ,borderRadius:'12px',fontSize:'15px'}} >
        {validating_otp ? 'Validating OTP...' : 'Validate Otp'}      
       </Button>



        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  )
}
