import React, { useState } from 'react'
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
import axios from 'axios'
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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



  
export const Forget_password = () => {

   
    const[mail,set_mail]=useState({email:'',otp:''})
 const [user_data,set_data]=useState({emailid:'',new_password:'',new_password2:''})
 const navigate=useNavigate()
    
    const handle_password=(e)=>{
      console.log("mail",mail)
      set_data({...user_data,emailid:mail.email})
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login_email`,mail)

      .then((resolve)=>{
        console.log(resolve.data)
        if(resolve.data.id==1)
        {
        
        //alert('Otp sent successfully...')
        toast.success('Otp sent  successfully!!!', {
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
       
        else if(resolve.data.id===2)
        {
          //alert('Error')
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
        else
        {
          
        // alert('Invalid User!!')
        toast.warning('Invalid User!!!', {
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
      set_mail({...mail,email:''})
   }
 
   const handle_Otp_from_mail=(e)=>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/verify_email`,mail)
    .then((resolve)=>{
      console.log(resolve.data)
      if(resolve.data?.username)
      {
          // alert('Give a new Password!!!')
          toast.success('Give a new Password!!!', {
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
      else
      {
        
       // alert('Wrong Otp!!!')
       toast.warning('Wrong Otp!!!', {
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
    set_mail({...mail,otp:''})
 }
 

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("user_details from forget password ",user_data)
        if( user_data.new_password==user_data.new_password2)
        {
            axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/forget_password`,user_data)
            .then((resolve)=>{
              console.log(resolve.data)
              if(resolve.data.id==1)
              {
                
               // alert(' Password Reset successfully!!!')
                toast.success(' Password Reset successfully!!!!!', {
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
                navigate('/')
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
              else
              {
               
                // alert('Password not reset!!')
                toast.warning('Password not rese!!!', {
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
              //
            })
            .catch((err)=>{
              console.log(err)
            })
        }

        else
        {
         
          //  alert('Mismatch new password')
          toast.warning('Mismatch new password!!!', {
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
        set_data({emailid:'',new_password:'',new_password2:''})
      };


  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex',flexDirection: 'column', alignItems: 'center',}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password reset
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

        <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="email"
          label="Email id"
          type="text"
          inputProps={{style: {fontSize: 15}}}
          id="email"
          value={mail.email}
          onChange={(e)=>set_mail({...mail,email:e.target.value})}
        />
      </Grid>

<Button onClick={handle_password} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Send Otp</Button>

  <TextField
  margin="normal"
  required
  fullWidth
  name="otp"
  label="Otp"
  inputProps={{style: {fontSize: 15}}}
  type="text"
  id="otp"
 value={mail.otp}
  onChange={(e)=>set_mail({...mail,otp:e.target.value})}
  />

  <Button onClick={handle_Otp_from_mail} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Validate Otp</Button>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="new_password"
                label="New Password"
                type="password"
                inputProps={{style: {fontSize: 15}}}
                id="new_password"
                value={user_data.new_password}
                onChange={(e)=>set_data({...user_data,new_password:e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="new_password2"
              label="Confirm New Password"
              type="password"
              inputProps={{style: {fontSize: 15}}}
              id="new_password2"
              value={user_data.new_password2}
          
              onChange={(e)=>set_data({...user_data,new_password2:e.target.value})}
            />
          </Grid>
          </Grid>

          <Button type="submit" fullWidth  variant="contained"  sx={{ mt: 3, mb: 2 }} >  Reset  </Button>
        </Box>
        
       

      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </ThemeProvider>
  )
}
