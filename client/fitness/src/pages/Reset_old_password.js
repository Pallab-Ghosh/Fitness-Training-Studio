import React, { useContext, useEffect, useState } from 'react'
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
import { accountDetails_holder } from '../App';
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



const Reset_old_password = () => {

   
    const [user_data,set_data]=useState({old_password:'',new_password:'',new_password2:''})
    const navigate=useNavigate()
  
   
  const[user_account_details,set_user_details]=useState({firstname:'',lastname:'',username:'',address:'',password:'',mobile:'',email:''})
  const token = JSON.parse(localStorage.getItem("userdata_with_token"));


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
    
        
  
   
       const handleSubmit = async(event) => {
           event.preventDefault();
          const updated_data={...user_data,username:user_account_details.username}
          console.log(updated_data)

           if( user_data.new_password==user_data.new_password2 && user_data.old_password)
           {
               axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/reset_password`, {updated_data},{
   
               headers: {
                 Authorization: 'Bearer '+ localStorage.getItem('userdata_with_token')
               }
               })
               .then((resolve)=>{
                 console.log(resolve.data)
                 if(resolve.data.id==1)
                 {
                  // alert(' Password Reset successfully!!!')
                  toast.success('Password Reset successfully!!!', {
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
                  // navigate('/')
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
                 else if(resolve.data.id==0)
                 {
                  
                  //  alert('user not found!!')
                  toast.warning('user not found!!!', {
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
                  //  alert('old password not matched !!')
                  toast.warning('old password not matched!!!', {
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
   
           else if(user_data.new_password!=user_data.new_password2)
           {
            
              // alert('Mismatch new password')
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
           else
           {
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
           set_data({old_password:'',new_password:'',new_password2:''})
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
             Reset Old Password
           </Typography>
   
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
             <Grid container spacing={2}>
   
           <Grid item xs={12}>
           <TextField
             required
             fullWidth
             name="old_password"
             label="Old Password"
             type="text"
             inputProps={{style: {fontSize: 15}}}
             id="old_password"
             value={user_data.old_password}
             onChange={(e)=>set_data({...user_data,old_password:e.target.value})}
           />
         </Grid>

   
   
               <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   name="new_password"
                   label="New Password"
                   type="password"
                   id="new_password"
                   inputProps={{style: {fontSize: 15}}}
                   value={user_data.new_password}
                   onChange={(e)=>set_data({...user_data,new_password:e.target.value})}
                 />
               </Grid>
   
               <Grid item xs={12}>
               <TextField
                 required
                 fullWidth
                 name="new_password2"
                 label="Confirm Password"
                 type="password"
                 inputProps={{style: {fontSize: 15}}}
                 id="new_password2"
                 value={user_data.new_password2}
                 onChange={(e)=>set_data({...user_data,new_password2:e.target.value})}
               />
             </Grid>
             </Grid>
   
             <Button
               type="submit"
               fullWidth
               variant="contained"
               color='success'
               sx={{ mt: 3, mb: 2,fontSize:'15px',borderRadius:'12px' }}
             >
               Reset
             </Button>

             <Button
             onClick={()=>navigate(-1)}
             fullWidth
             variant="contained"
             color='error'
             sx={{ mt: 3, mb: 2 ,fontSize:'15px',borderRadius:'12px'}}
           >
            GO BACK
           </Button>


           </Box>
           
          
   
         </Box>
     
       </Container>
     </ThemeProvider>
     )
  
}

export default Reset_old_password