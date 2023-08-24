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
import toast, { Toaster } from 'react-hot-toast';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { login_handler, token_data } from '../App';
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
 console.log("token from login_email",user_token)
  


  const handle_click=(e)=>{
     e.preventDefault();
     axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login_email_with_email`,email_and_otp)
     .then((resolve)=>{
       console.log(resolve.data)
       if(resolve.data.id==1)
       {
        
       alert('Otp sent successfully...')
       }

     else if(resolve.data.id===2)
     {
      alert('Error')
     }

       else
       {
        
        alert('Invalid User!!')
       }
     })
     .catch((err)=>{
       console.log(err)
     })
     setemail_andotp({...email_and_otp,email:''})
  }


const handle_Otp=(e)=>{
   e.preventDefault();
   axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/verify_email_with_email`,email_and_otp)
   .then((resolve)=>{
     console.log(resolve.data)
     if(resolve.data)
     {
      
       localStorage.setItem('userdata_with_token',JSON.stringify(resolve.data))
        console.log("local storage data after signin using email ",localStorage.getItem("userdata_with_token"));
        var data=JSON.parse(localStorage.getItem("userdata_with_token"));
        console.log(data)
        var{token}=data;
        console.log(token)
        set_token(token);
       navigate('/home')
     }
     
     else if(resolve.data.id===2)
     {
      alert('Error')
     }
     else
     {
      
       alert('Wrong Otp!!!')
     }
   })
   .catch((err)=>{
     console.log(err)
   })
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
            label="email"
            name="email"
            autoComplete="email"
            inputProps={{style: {fontSize: 15}}}
            type="text"
            autoFocus
           value={email_and_otp.email}
            onChange={(e)=>setemail_andotp({...email_and_otp,email:e.target.value})}
          />
        
         
        <Button onClick={handle_click} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Send Otp</Button>

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

       <Button type="submit" onClick={handle_Otp} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Validate Otp</Button>



        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  )
}
