import React, { useContext, useReducer } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { login_handler, token_data} from '../App';
import { Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export const Signin = () =>{


  const [user_details,set_user_details]=useState({username:'',password:'',})
  const navigate = useNavigate()
  const{user_token,set_token}=useContext(token_data)
 


  const handleSubmit=(event) => {
      event.preventDefault();
      //console.log(user_details)
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login`,user_details)

    .then((resolve)=>{
     
      if(resolve.data.token)
      {
      
        localStorage.setItem('userdata_with_token',JSON.stringify(resolve.data))
        toast.success('Signin successfully!!!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style:{color:'black'}
          });
       window.location.href='/home'
      }

      else if(resolve.data.id===2)
      {
       // alert('Error')
       toast.error('Error!!!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style:{color:'black'}
        });
      }

      else if(resolve.data.id===7)
      {
      //  alert('User not registered')
      toast.warning('User not registered!!!', {
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
       
      // alert(`Wrong credential`)
      toast.warning('Wrong credential!!!', {
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
    set_user_details({username:'',password:'',})
  
   
  };

  
  return (
    <ThemeProvider theme={defaultTheme}>
   
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://thumbs.dreamstime.com/b/closeup-portrait-muscular-man-workout-barbell-gym-brutal-bodybuilder-athletic-six-pack-perfect-abs-shoulders-55122231.jpg?w=1200)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
       
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="Username"
              type="text"
              autoFocus
              inputProps={{style: {fontSize: 15}}}
              value={user_details.username}
              onChange={(e)=>set_user_details({...user_details,username: e.target.value})}
              />

              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputProps={{style: {fontSize: 15}}}
              autoComplete="current-password"
              value={user_details.password}
              onChange={(e)=>set_user_details({...user_details,password: e.target.value})}
              />

             

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color='success'
                sx={{ mt: '3px', mb: '15px' ,fontSize:'15px',borderRadius:'10px'}}

              >
                Sign In
              </Button>

              <Grid container sx={{gap:'5px'}}>

                <Grid item xs>
                  <Link href="/signin/forget_password" variant="h5">
                    Forgot password?
                  </Link>
                </Grid>

                <Grid item>
                  <Link href="/signin/signup" variant="h5">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>

                <Grid item xs={7}>
                <Link href="/signin/admin_login" variant="h5">
                  {"Admin Login"}
                </Link>
              </Grid>

                <Grid item xs={10}>
                <Link  href="/signin/login_email" variant="h5" >
                  {"Log in using email"}
                </Link>

                
                

               <Box sx={{ mt: 5}}>
               <Button fullWidth variant='contained' color='error' size='large' onClick={()=>navigate('/')} sx={{fontSize:'15px',mt: '3px', mb: '2px',ml:'50px',borderRadius:'10px'}}>Back to Main Page</Button>
               </Box>

              </Grid>

              </Grid>
           
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}