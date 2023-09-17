import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, createStyles } from '@mui/material';
import { token_data } from '../App';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';




const AdminLoginPage = () => {

  const [admin_data, set_admin_data] = useState({username:'',password:'',email:'',otp:''});
  const navigate = useNavigate()
  const{user_token,set_token}=useContext(token_data)

//when send the otp to email
  const handle_click=(e)=>{
    e.preventDefault();
    if(admin_data.username.includes('admin') && admin_data.email=='gpallab405@gmail.com' && admin_data.email!=null  )
    {
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login_email_with_email`,admin_data)
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
      set_admin_data({username:'',password:'',email:''})
    }

    else
    {
       alert('Please provide valid Admin details')
       set_admin_data({username:'',password:'',email:''})
    }
 
 }


//when verify otp
const handle_Otp=async(e)=>{
  e.preventDefault();
 
   if(admin_data.otp==='')
   {
     alert('Please provide Otp')
   }

   else if(admin_data.otp!='')
   {

    const fetch_data=await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/verify_email_with_email`,admin_data)
    console.log(fetch_data.data)
    if(fetch_data.data.token)
    {
      const{token}={...fetch_data.data}
      console.log("token from api",token)
      localStorage.setItem("userdata_with_token",JSON.stringify(token))
      set_token(JSON.stringify(token))
      navigate('/signin/admin_login/dashboard')
    }
     
   
   }

   set_admin_data({...admin_data,otp:''})
}

 



  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column',alignItems: 'center',mt:20}} >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form style={{ width: '100%', marginTop: 1,}}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{style: {fontSize: 18}}}
            label="Username"
            value={admin_data.username}
            onChange={(e) => set_admin_data({...admin_data,username:e.target.value})}
            autoFocus
          />

          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          required
          inputProps={{style: {fontSize: 18}}}
          label="Email"
          value={admin_data.email}
          onChange={(e) => set_admin_data({...admin_data,email:e.target.value})}
          autoFocus
        />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{style: {fontSize: 18}}}
            label="Password"
            type="password"
            value={admin_data.password}
            onChange={(e) => set_admin_data({...admin_data,password:e.target.value})}
          />

          <Button type="submit" fullWidth  variant="contained"  color="primary" sx={{marginTop:5}} onClick={handle_click}> Send Otp  </Button>

          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder='Please provide Otp'
          inputProps={{style: {fontSize: 18}}}
          label="OTP"
          type="text"
          required
          value={admin_data.otp}
          onChange={(e) => set_admin_data({...admin_data,otp:e.target.value})}
        />

         <Button type="submit" fullWidth  variant="contained"  color="primary" sx={{marginTop:5}} onClick={handle_Otp} > Login  </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;
