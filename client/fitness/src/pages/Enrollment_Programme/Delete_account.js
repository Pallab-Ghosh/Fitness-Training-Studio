import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Button } from 'rsuite';
import { useNavigate } from 'react-router-dom';


  

const Delete_account = () => {
const[user_account_details,set_user_details]=useState({firstname:'',lastname:'',username:'',address:'',password:'',mobile:'',email:''})
const[otp,set_otp]=useState('')
const navigate=useNavigate()
useEffect(()=>{

  const get_details=async()=>{
    const resolve_data=await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`)
    console.log("data from get",resolve_data);
    set_user_details(resolve_data.data);
    console.log(user_account_details)
  }
  get_details();
 },[])

const handle_click_for_confirmation=async()=>{
  console.log("otp",otp)
 const response=await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_account`,{otp:otp})
  if(response.data.id==1)
  {
    alert('Delete account succeessfully')
    navigate('/')
  }
  else
  {
    alert('Not deleteted')
  }
  set_otp('')
}

  return (
<Box sx={{ width: 1700,height: 800, backgroundColor: 'white',display:'flex',flexDirection:'row',gap:'170px'}}>


<Box sx={{ width: 900,height: 800, backgroundColor:'white',display:'flex',flexDirection:'column',gap:'30px',mt:5,ml:5}}>
<Box sx={{ width: 900,height: 400, backgroundColor:'white'}}>
<Typography variant='h4'  sx={{fontWeight:'bold'}}><p>When you deactivate your account</p></Typography>
<Typography variant='h4'>
<p>You are logged in your  Account</p>
<p>Your public profile on Flipkart is no longer visible</p>
<p>Your reviews/ratings are still visible, while your profile information is shown as ‘unavailable’ as a result of deactivation.</p>
<p>Your wishlist items are no longer accessible through the associated public hyperlink. Wishlist is shown as ‘unavailable’ as a result of deactivation
</p>
<p>You will be unsubscribed from receiving promotional emails from Flipkart</p>
<p>Your account data is retained and is restored in case you choose to reactivate your account</p>
</Typography>
</Box>

<Box sx={{ width: 900,height: 400, backgroundColor:'white'}}>
<Typography variant='h4' sx={{fontWeight:'bold'}}><p>How do I reactivate my Flipkart account?</p></Typography>
<Typography variant='h4'>
<p>Reactivation is easy.</p>
<p>Simply login with your registered email id or mobile number and password combination used prior to deactivation. Your account data is fully restored.
 Default settings are applied and you will be subscribed to receive promotional emails from Flipkart.</p>
<p>Flipkart retains your account data for you to conveniently start off from where you left, if you decide to reactivate your account.</p>
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
<Button variant="contained" color="primary" style={{width:'380px'}} onClick={handle_click_for_confirmation}>CONFIRM DEACTIVATION</Button><br/>

<Button variant="text" color="primary" style={{width:'380px'}} onClick={()=>navigate(-1)}>NO,LET ME STAY</Button><br/>
</Box>

</Box>


</Box>

    
  );
  
}

export default Delete_account