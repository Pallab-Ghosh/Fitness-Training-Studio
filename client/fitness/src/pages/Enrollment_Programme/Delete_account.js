import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  

const Delete_account = () => {
const[user_account_details,set_user_details]=useState({firstname:'',lastname:'',username:'',address:'',password:'',mobile:'',email:''})
const[otp,set_otp]=useState('')
const navigate=useNavigate();
const token = JSON.parse(localStorage.getItem("userdata_with_token"));
const otp_for_delete = JSON.parse(localStorage.getItem("otp_for_delete"))

useEffect(()=>{

  const get_details=async()=>{
    const resolve_data=await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`,{
      headers:{
        Authorization: `Bearer ${token}`  
      }
    })
    console.log("data from get",resolve_data);
    set_user_details(resolve_data.data);
    console.log(user_account_details)
  }
  get_details();
 },[])

 

const handle_click_for_confirmation=async()=>{
  console.log("otp",otp)

  if(otp === otp_for_delete)
  {
      const response=await axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_account`,{otp:otp},{
        headers:{  Authorization: `Bearer ${token}`}})

        if(response.data.id==1)
              {
                  // alert('Delete account succeessfully')
                  toast.success('Account Deleted successfully!!!', {
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
          else
              {
                //alert('Not deleteted')
                toast.warning('Not deleteted!!!', {
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

  else
  {
    //alert('Not deleteted')
    toast.warning('Please Provide valid OTP!!!', {
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
  set_otp('')
}

  return (
<Box sx={{ width: 1700,height: 800, backgroundColor: 'white',display:'flex',flexDirection:'row',gap:'170px'}}>


<Box sx={{ width: 900,height: 800, backgroundColor:'white',display:'flex',flexDirection:'column',gap:'30px',mt:5,ml:5}}>
<Box sx={{ width: 900,height: 400, backgroundColor:'white'}}>
<Typography variant='h4'  sx={{fontWeight:'bold'}}><p>When you deactivate your account</p></Typography>
<Typography variant='h4'>
<p>You are logged in your  Account.</p>
<p>You will be unsubscribed from receiving Special Offers emails from FITNESS-TRAINING-STUDIO.</p>
<p>You can access the tutorials in case you choose to reactivate your Account.</p>
<p>Documents verification needed for re-admission.</p>
</Typography>
</Box>

<Box sx={{ width: 900,height: 400, backgroundColor:'white'}}>
<Typography variant='h4' sx={{fontWeight:'bold'}}><p>How do I reactivate my Flipkart account?</p></Typography>
<Typography variant='h4'>
<p>Reactivation is easy.</p>
<p>Fillup Signup form with your email id  mobile number and password username. Your account will be created.
 Default settings are applied and you will be subscribed to receive promotional emails from our team.</p>
<p>You can fully access your account like previously</p>
<p sx={{}}>Remember: Account Reactivation can be done on the Desktop version only.</p>
</Typography>
</Box>
</Box>



<Box sx={{ width: 500,height: 600, backgroundColor:'white'}}>
<Typography variant='h4' sx={{fontWeight:'bold',mt:5}}><p >Are you sure you want to leave?</p></Typography>
<TextField
margin="normal"
required
sx={{width:380}}
label="Username"
name="username"
autoComplete="Username"
type="text"
autoFocus
disabled="disabled"
value={user_account_details.username}
inputProps={{style: {fontSize: 15}}}
/>
<TextField
margin="normal"
required
sx={{width:380}}
label="Email"
name="email"
autoComplete="email"
type="text"
autoFocus
disabled="disabled"
value={user_account_details.email}
inputProps={{style: {fontSize: 15}}}
/>

<TextField
margin="normal"
required
sx={{width:380}}
label="Mobile"
name="mobile"
autoComplete="mobile"
type="text"
autoFocus
disabled="disabled"
value={user_account_details.mobile}
inputProps={{style: {fontSize: 15}}}

/>

<TextField
margin="normal"
required
sx={{width:380}}
name="otp"
type="text"
label="Otp"
autoFocus
value={otp}
inputProps={{style: {fontSize: 15}}}
onChange={(e)=>set_otp(e.target.value)}
/>


<Box display='flex' flexDirection='column' style={{gap:'2px'}}> 
<Button variant="contained" color="primary" style={{width:'380px',borderRadius:'12px'}} onClick={handle_click_for_confirmation}>CONFIRM DEACTIVATION</Button><br/>

<Button variant="text" color="primary" style={{width:'380px',borderRadius:'12px'}} onClick={()=>navigate(-1)}>NO,LET ME STAY</Button><br/>
</Box>

</Box>


</Box>

    
  );
  
}

export default Delete_account