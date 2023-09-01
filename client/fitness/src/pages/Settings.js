import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
import { Box, Button, Typography } from '@mui/material'


const Settings = () => {
const [all_data,set_all_data]=useState([])
const[all_visitor_data,set_visitor_data]=useState([])
const [option_value,set_option_value]=useState('unsolved')

useEffect(()=>{
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


const handle_option=(id,e)=>{
  e.preventDefault()
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
    <>
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
                    <th>Date-of-Query</th>
                    <th>Status</th>
                    <th>Confirm</th>
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
                      <td>{user.date_of_query}</td>
                     
                      <td style={{backgroundColor:'darkslategray'}}>
                      <select value={option_value}  onChange={(e)=>set_option_value(e.target.value)} style={{backgroundColor:'ThreeDDarkShadow'}}>
                      <option value="solved" color='red' style={{backgroundColor:'blue'}} >Solved</option>
                      <option value="unsolved" style={{backgroundColor:'blue'}}>Unsolved</option>
                      </select>
                      </td>
                     <td><button onClick={(e)=>handle_option(user._id,e)}>Submit</button></td> 
                     <td> <button  onClick={() => handleDelete2(user._id)}  color='success'>Delete</button> </td>
                    </tr>
                 
                  ))}
                </tbody>
              </table>
    </div>
    </Box>
    </>
    
  )
}

export default Settings