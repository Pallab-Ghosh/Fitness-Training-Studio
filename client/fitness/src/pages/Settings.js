import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import fitness_logo from './icon/fitness-training-studio-logo.png'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import '../landing_page/LandingPage.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';







const Settings = () => {

  const [open, setOpen] = React.useState(false);

const [all_data,set_all_data]=useState([])
const[all_visitor_data,set_visitor_data]=useState([])
const [option_value,set_option_value]=useState('')
const navigate=useNavigate()
const[user_account_details,set_user_details]=useState({})
const{firstname,lastname,username,address,password,mobile,email,course,subscription_date,price_of_course}={...user_account_details};
const[new_user,set_new_user]=useState({firstname:'',lastname:'',address:'',mobile:'',course:'',age:'',username:''})







//dialog box for add new user
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};






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
        //alert('Deleted user successfully')
        toast.success('User Deleted Successfully', {
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
              //alert('Status update successfully')
              axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
              .then((res)=>{
                console.log(res)
                set_visitor_data(res.data)
            })

              toast.success('Status Update Successfully', {
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
              axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
              .then((res)=>{
                console.log(res)
                set_visitor_data(res.data)
                })
    }
  })
}


const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const currentDate = new Date();
  const timeDiff = currentDate - dobDate;
  const ageDate = new Date(timeDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};


const handle_form_submission=async(e)=>{
  e.preventDefault()
  console.log("new_user.age",new_user.age)
  let converted_age=calculateAge(new_user.age)
  console.log(converted_age)
  console.log(typeof(converted_age))
  const new_updated_user={...new_user,age:converted_age}
  console.log("newuser",new_updated_user)

  axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/add_new_user`,new_updated_user)
         .then((resolve)=>{
           console.log(resolve)
           if(resolve.data.id==1)
           {


            axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/all_users`)
            .then((res)=>{
              
                console.log(res)
                set_all_data(res.data)
            })
            //  handleClose()
               setOpen(false)
              //alert('Signup successfully!!!')
              toast.success('User Registration successfully!!!', {
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
            else if(resolve.data.id==2)
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

          else 
             { 

               //alert('Already have an account or Error in input')
               toast.warning('Already have an account or Error in input!!!', {
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
   set_new_user({firstname:'',lastname:'',address:'',mobile:'',course:'',age:'',username:''})
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
       //alert('Deleted Visitor successfully')
       axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
       .then((res)=>{
         console.log(res)
         set_visitor_data(res.data)
     })
       toast.success('Visitor Deleted Successfully', {
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

        axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
        .then((res)=>{
          console.log(res)
          set_visitor_data(res.data)})
     }
     
   })
 };

  return (
    <div style={{backgroundColor:'#01234a'}} > 
  <Button  variant='contained' color='error' size='large'  onClick={()=>navigate(-1)} sx={{ml:3,mb:'10px',mt:'40px',fontSize:'14px'}}>Go Back</Button>
  <Button  variant='contained' color='success' size='large'  sx={{ml:'1555px',mb:'-108px',fontSize:'14px'}} onClick={handleClickOpen}>Add User</Button>
    <Typography variant='h2' sx={{marginLeft:90}} color='#e6ebed'>User Data</Typography>
   
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
          <th>Action</th>
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
            <td> <Button onClick={() => handleDelete(user._id)} fullWidth variant='contained' color='error'  size='large' style={{fontSize:'13px'}}>Delete</Button> </td>
          </tr>
        
        ))}
      </tbody>
    </table>
    </div>

    <Box sx={{mt:'140px'}}>
    <Typography variant='h2' sx={{marginLeft:90}} color='#e6ebed'>Visitor Data</Typography>
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
                        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'-28px'}}>
                        <th>Action</th>
                        </div>
                   
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
                     
                      <td style={{backgroundColor:'#19293b'}}>
                      <FormControl  sx={{ m: 1, width: 180 }}>
                    
                      <Select
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        autoWidth
                        value={option_value}
                        label="Select Issue status"
                        onChange={handleChange}
                        style={{backgroundColor:'#3956cc',color:'white',fontSize:'14px'}}
                      >
                      <MenuItem value=""> <em style={{fontSize:'17px',fontWeight:'bolder',textAlign:'center'}}>None </em></MenuItem>
                        <MenuItem value={'Resolved'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Resolved</MenuItem>
                        <MenuItem value={'Unresolved'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Unresolved</MenuItem>
                        <MenuItem value={'Pending'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Pending</MenuItem>
                      </Select>
                    </FormControl>
                      </td>

                     <td><Button onClick={(e)=>handle_option(user._id,e)} fullWidth color='success' variant='contained'   size='large' style={{fontSize:'13px'}}>Submit</Button></td> 
                     <td> <Button  onClick={() => handleDelete2(user._id)} fullWidth color='error'  variant='contained'  size='large' style={{fontSize:'13px'}} >Delete</Button> </td>
                    </tr>
                 
                  ))}
                </tbody>
              </table>



    </div>
    </Box>

    <form onSubmit={handle_form_submission}>
    <Dialog open={open} onClose={handleClose} >
    <DialogTitle sx={{fontSize:'20px',backgroundColor:'#3e82f7',color:'#e6e7f0'}}>New User Registration</DialogTitle>
    <DialogContent sx={{backgroundColor:'#dee2fa'}}>
    
     
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="firstname"  label="Firstname"  type="text"  fullWidth  variant="standard" value={new_user.firstname} onChange={(e)=>set_new_user({...new_user,firstname:e.target.value})} />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="lastname"   label="Lastname"   type="text"  fullWidth  variant="standard"  value={new_user.lastname}   onChange={(e)=>set_new_user({...new_user,lastname:e.target.value})} />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="age"              type="date"  fullWidth  variant="standard"  value={new_user.age}   onChange={(e)=>set_new_user({...new_user,age:e.target.value})} />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="email"      label="Email Address"  type="email"  fullWidth  variant="standard"  value={new_user.email}  onChange={(e)=>set_new_user({...new_user,email:e.target.value})}  />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="mobile"     label="Mobile"  type="number"  fullWidth  variant="standard" value={new_user.mobile}  onChange={(e)=>set_new_user({...new_user,mobile:e.target.value})}  />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="address"    label="Address"  type="text"  fullWidth  variant="standard" value={new_user.address}  onChange={(e)=>set_new_user({...new_user,address:e.target.value})}  />
        <TextField   inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="username"    label="Username"  type="text"  fullWidth  variant="standard" value={new_user.username}  onChange={(e)=>set_new_user({...new_user,username:e.target.value})}  />
     
   
    </DialogContent>

    <DialogActions sx={{backgroundColor:'#dee2fa'}}>
      <Button onClick={handleClose} variant='contained' color='error'>Cancel</Button>
      <Button onClick={handle_form_submission} variant='contained' color='success'>Submit</Button>
    </DialogActions>
  </Dialog>
  </form>
    <footer className='landing_page_footer'>
        {"Powered By Fitness-Training-Studio"}
      </footer>
    </div>
    
  )
}

export default Settings