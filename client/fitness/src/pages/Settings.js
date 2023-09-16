import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import fitness_logo from './icon/fitness-training-studio-logo.png'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const Settings = () => {
const [all_data,set_all_data]=useState([])
const[all_visitor_data,set_visitor_data]=useState([])
const [option_value,set_option_value]=useState('')
const navigate=useNavigate()
const[user_account_details,set_user_details]=useState({})
const{firstname,lastname,username,address,password,mobile,email,course,subscription_date,price_of_course}={...user_account_details};

useEffect(()=>{
  axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`)
  .then((res)=>{
    set_user_details(res.data)
  })
},[])



const handleChange = (event) => {
  set_option_value(event.target.value);
}

useEffect(()=>{
  console.log("1")
    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/all_users`)
    .then((res)=>{
      
        console.log(res)
        set_all_data(res.data)
    })

    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
    .then((res)=>{
      console.log(res)
      set_visitor_data(res.data)
  })

},[])





const handleDelete = (userId) => {
   console.log(userId)
    const updatedUsers = all_data.filter((user) => user._id !== userId);
    console.log(updatedUsers);
    set_all_data(updatedUsers);
    axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_user/${userId}`)
    .then((res)=>{
      console.log(res);
      if(res.data.id==1)
      {
        alert('Deleted user successfully')
      }
      
    })
  };

 ;

const handle_option=(id,e)=>{
  e.preventDefault()
  console.log(e.target.value)
  const id_with_option_value={
    _id:id,
    value:option_value
  }

  axios.patch(`${process.env.REACT_APP_EXPRESS_URL}/user/update_status`,id_with_option_value)
  .then((res)=>{
    console.log(res)
    if(res.data.id==1)
    {
      alert('Status update successfully')
    
              axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
              .then((res)=>{
                console.log(res)
                set_visitor_data(res.data)
                })
    }
  })
}


const handleDelete2 = (userId) => {
  console.log(userId)
   const updated_visitor_data = all_visitor_data.filter((user) => user._id !== userId);
   console.log(updated_visitor_data);
   set_visitor_data(updated_visitor_data);
   axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_visitor/${userId}`)
   .then((res)=>{
     console.log(res);
     if(res.data.id==1)
     {
       alert('Deleted Visitor successfully')
     }
     
   })
 };

  return (
    <div style={{marginTop:'30px'}} > 
    <Typography variant='h2' sx={{mb:'20px',ml:'600px',mt:'4px'}} color='blue'>Fitness-Training-Studio</Typography>
    <Typography variant='h5' sx={{mb:1}}> <AdminPanelSettingsIcon/>{`${firstname} ${lastname}`}</Typography>
   <Typography variant='h6' sx={{mt:0.5,ml:3,mb:4}}><MailIcon/>{`${email}`}</Typography>
    <Button size='medium' variant='contained' color='error' onClick={()=>navigate(-1)} sx={{ml:3,mb:'10px',mt:'1px'}}>Go Back</Button>
    <Typography variant='h2' sx={{marginLeft:90}} color='gray'>User Data</Typography>
   
    <div className="user-list">
    <table>
      <thead>
        <tr>
          <th>UserId</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Age</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Date-of-Registration</th>
          <th>Course-details</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {all_data.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.address}</td>
            <td>{user.date_and_time}</td>
            <td>{user.course}</td>
            <td> <button onClick={() => handleDelete(user._id)} color='success'>Delete</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

    <Box sx={{mt:'140px'}}>
    <Typography variant='h2' sx={{marginLeft:90}} color='gray'>Visitor Data</Typography>
      <div className="user-list2">
              <table>
                <thead>
                  <tr>
                  <th>Visitor-Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Message</th>
                    <th>Applicant-Status</th>
                    <th>Date-of-Query</th>
                    <th>Isuue-resolved</th>
                    <th >Status</th>
                    <th>Confirmation</th>
                    <th>Options</th>
                  </tr>
                </thead>

                <tbody>
                  {all_visitor_data.map((user) => (
                    <tr key={user._id}>
                    <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.message}</td>
                      {user.status=='Resolved'?<td style={{backgroundColor:'green'}}><DoneIcon/>{user.status}</td>:<td style={{backgroundColor:'red'}}><CloseIcon/>{user.status}</td>} 
                      <td>{user.date_of_query}</td>
                      <td>{user.date_of_query_closed}</td>
                     
                      <td style={{backgroundColor:'darkslategray'}}>
                      <FormControl  sx={{ m: 1, width: 180 }}>
                      <InputLabel id="demo-simple-select-standard-label" sx={{color:'black',fontSize:'12px'}}>Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        autoWidth
                        value={option_value}
                        label="Select Issue status"
                        onChange={handleChange}
                        style={{backgroundColor:'Scrollbar'}}
                      >
                      <MenuItem value=""> <em style={{fontSize:'12px',fontWeight:'bolder'}}>None </em></MenuItem>
                        <MenuItem value={'Resolved'} style={{width:180,fontSize:'12px',color:'brown',fontWeight:'bolder'}}>Resolved</MenuItem>
                        <MenuItem value={'Unresolved'} style={{width:180,fontSize:'12px',color:'brown',fontWeight:'bolder'}}>Unresolved</MenuItem>
                        <MenuItem value={'Pending'} style={{width:180,fontSize:'12px',color:'brown',fontWeight:'bolder'}}>Pending</MenuItem>
                      </Select>
                    </FormControl>
                      </td>

                     <td><button onClick={(e)=>handle_option(user._id,e)}>Submit</button></td> 
                     <td> <button  onClick={() => handleDelete2(user._id)}  color='success'>Delete</button> </td>
                    </tr>
                 
                  ))}
                </tbody>
              </table>
    </div>
    </Box>
    <footer style={{marginLeft:'600px',fontSize:'37px',color:'red'}}>
    Maintained By Fitness-Training-Studio
   </footer>
    </div>
    
  )
}

export default Settings