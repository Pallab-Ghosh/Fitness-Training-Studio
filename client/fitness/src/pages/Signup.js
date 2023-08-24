import React, { useContext, useReducer, useRef, useState } from 'react'
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { token_handler } from '../App';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik'
import { FormHelperText } from '@material-ui/core'
import * as Yup from 'yup'
import { ClassNames } from '@emotion/react';
import { useNavigate } from 'react-router-dom';




  const refresh = () => window.location.reload(true)


 

const defaultTheme = createTheme(); 


export const Signup = () => {

    const navigate=useNavigate()

      const phoneRegExp =  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
      const validationSchema = Yup.object({
        email: Yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
          password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
          confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
          mobile: Yup.string()
          .required("required")
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, "too short")
          .max(10, "too long"),
      });
      


      const formik = useFormik({
        initialValues: {
          firstname:'',
          lastname:'',
          address:'',
          email: 'foobar@example.com',
          password: '',
          mobile:'',
          username:'',
          confirmPassword:''
        },
        validationSchema: validationSchema,
        onSubmit: async(values)=>{
        console.log(values)
        console.log(process.env.REACT_APP_EXPRESS_URL)
        axios.post(`${process.env.REACT_APP_EXPRESS_URL}/auth/signup`,values)
               .then((resolve)=>{
                 console.log(resolve)
                 if(resolve.data.id==1)
                 {
                
                    alert('Signup successfully!!!')
                    navigate('/')
                  } 
                  else if(resolve.data.id==2)
                  {
                    alert('Error')
                  }

                else 
                   { 
                     alert('Already have an account or Error in input')
                   }
             })
        
        }
      });




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
          Sign up
        </Typography>

        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3, backgroundColor: "white", }} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                type="text"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputProps={{style: {fontSize: 15}}}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <TextField
                type="text"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                inputProps={{style: {fontSize: 15}}}
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="text"
                id="email"
                label="Email Address"
                name="email"
                inputProps={{style: {fontSize: 15}}}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
        
                fullWidth
                name="mobile"
                label="Mobile"
                type="Number"
                id="mobile"
                inputProps={{style: {fontSize: 15}}}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
        
              fullWidth
              name="address"
              label="address"
              type="text"
              id="address"
               multiline
               inputProps={{style: {fontSize: 15}}}
               value={formik.values.address}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               error={formik.touched.address && Boolean(formik.errors.address)}
               helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type="text"
            id="username"
            label="UserName"
            name="username"
            inputProps={{style: {fontSize: 15}}}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>


            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{style: {fontSize: 15}}}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              inputProps={{style: {fontSize: 15}}}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>



      
          </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="h5" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
         
        </Box>
     
      </Box>
  
    </Container>
  </ThemeProvider>
  )
}
    


