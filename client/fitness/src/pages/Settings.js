import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
import { Typography } from '@mui/material'


const Settings = () => {
const [all_data,set_all_data]=useState([])

useEffect(()=>{
    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/all_users`)
    .then((res)=>{
        console.log(res)
        set_all_data(res.data)
    })
},[])


const handleDelete = (userId) => {
   console.log(userId)
    const updatedUsers = all_data.filter((user) => user._id !== userId);
    console.log(updatedUsers);
    set_all_data(updatedUsers);
    axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_user/${userId}`,userId)
    .then((res)=>{
      console.log(res);
      if(res.data.id==1)
      {
        alert('Deleted user successfully')
      }
      
    })
  };


  return (
    <div className="user-list">

   <Typography variant='h2' sx={{marginTop:2,marginLeft:90}}>User Data</Typography>
    <table>
      <thead>
        <tr>
          <th>UserId</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Address</th>
        </tr>
      </thead>

      <tbody>
        {all_data.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.address}</td>
            <td>
            <button onClick={() => handleDelete(user._id)} color='success'>Delete</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Settings