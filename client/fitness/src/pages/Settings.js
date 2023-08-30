import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
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
    const updatedUsers = all_data.filter((user) => user.id !== userId);
    set_all_data(updatedUsers);
  };


  return (
    <div className="user-list">

    <h2>User List</h2>
    <table>
      <thead>
        <tr>
        
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
          <tr key={user.id}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.address}</td>
            <td>
            <button onClick={() => handleDelete(user.id)} color='success'>Delete</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Settings