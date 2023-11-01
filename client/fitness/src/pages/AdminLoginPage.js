import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, createStyles } from '@mui/material';
import { token_data } from '../App';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminLoginPage = () => {

  const [admin_data, set_admin_data] = useState({username:'',password:'',email:'',otp:''});
  const navigate = useNavigate()
  const[error,seterror]=useState(false)
  const{user_token,set_token}=useContext(token_data)
  const[sending_otp,set_sending_otp]=useState(false);
  const[validating_otp,set_validating_otp]=useState(false);


//when send the otp to email
  const handle_click=(e)=>{
    e.preventDefault();

    if(admin_data.username.includes('admin') && admin_data.email=='gpallab405@gmail.com' && admin_data.password!=null  )
    {
       set_sending_otp(true)
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login_email_with_email`,admin_data)
      .then((resolve)=>{
        console.log(resolve.data)
        if(resolve.data.id==1)
        {
         
        //alert('Otp sent successfully...')
        set_sending_otp(false)
        toast.success('Otp Sent to Registered Email!!!', {
          position:"top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style:{color:'white'}
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
        style:{color:'white'}
        });
      }
  
        else
        {
         
        // alert('Invalid User!!')
        toast.warning('Invalid Admin Credentials!!!', {
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
      set_admin_data({username:'',password:'',email:''})
    }

    else
    {
      // alert('Please provide valid Admin details')
      toast.warning('Provide Valid Admin Details!!!', {
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
       set_admin_data({username:'',password:'',email:''})
    }
 
 }


//when verify otp
const handle_Otp=async(e)=>{
  
  e.preventDefault();
  console.log("admin_data",admin_data)
 
   if(admin_data.otp==='')
   {
     //alert('Please provide Otp')
     toast.warning('Please provide Otp!!!', {
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
    
    set_validating_otp(true)
    const fetch_data=await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/verify_email_with_email`,admin_data)
    console.log("fetch_data.data",fetch_data.data)

    if(fetch_data.data.token)
    {
      const{token}={...fetch_data.data}
      console.log("token from api",token)
      localStorage.setItem("userdata_with_token",JSON.stringify(token))
      set_token(JSON.stringify(token))
      set_validating_otp(false)
      toast.success('Welcome to Admin Dashboard', {
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
  
      navigate('/signin/admin_login/dashboard')
    }
    else if(fetch_data.data===0)
    {
      alert ('Otp Mismatch')
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
        <form style={{ width: '100%', marginTop: 1,}} onSubmit={handle_click}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type='text'
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

          <Button type="submit" disabled={sending_otp}  fullWidth size='large'  variant="contained"  color="primary" sx={{marginTop:5,fontSize:'15px',borderRadius:'12px'}} > 
            {sending_otp ? 'Sending OTP...' : 'SEND OTP'}  
          
          </Button>

        </form>
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

       <Button disabled={validating_otp}  fullWidth  size='large'  variant="contained"  color="primary" sx={{marginTop:5,fontSize:'15px',borderRadius:'12px'}} onClick={handle_Otp} >
        {validating_otp ? 'Validating OTP' : 'Login'}    
        
      </Button>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;
