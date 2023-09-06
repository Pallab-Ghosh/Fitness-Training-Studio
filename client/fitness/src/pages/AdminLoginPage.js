import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, createStyles } from '@mui/material';
import { token_data } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const AdminLoginPage = () => {

  const [admin_data, set_admin_data] = useState({username:'',password:'',email:''});
  const navigate = useNavigate()
  const{user_token,set_token}=useContext(token_data)


  const handleSubmit = (e) => {
    e.preventDefault();
      
    //console.log(admin_data)
    if(admin_data.username.includes('admin') && admin_data.email=='gpallab405@gmail.com')
    {
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/login`,admin_data)

      .then((resolve)=>{
       console.log(resolve.data)
        if(resolve.data.token)
        {
        
          localStorage.setItem('userdata_with_token',JSON.stringify(resolve.data))
          window.location.href='/signin/admin_login/dashboard'
        }
        else if(resolve.data.id===2)
        {
          alert('Error')
        }
  
        else if(resolve.data.id===7)
        {
          alert('Admin not registered')
        }
        
        else
        {
         
         alert(`Wrong credential`)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    else
    {
      alert('Credential not match')
    }
     
    set_admin_data({username:'',password:'',email:''})
  
    
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column',alignItems: 'center',mt:20}} >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form  onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1,}}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            value={admin_data.username}
            onChange={(e) => set_admin_data({...admin_data,username:e.target.value})}
            autoFocus
          />

          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          value={admin_data.email}
          onChange={(e) => set_admin_data({...admin_data,email:e.target.value})}
          autoFocus
        />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={admin_data.password}
            onChange={(e) => set_admin_data({...admin_data,password:e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           sx={{marginTop:5}}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage;
