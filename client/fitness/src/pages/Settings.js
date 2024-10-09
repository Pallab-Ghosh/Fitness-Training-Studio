import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import './Adminsetting.css'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
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
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminRouteLayout from './admin_route_layout'
import { sidebarcontext } from '../App'
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import AlertDialog from '../components/Dialog'
import PaperCard from '../components/Paper'
import PendingActionsIcon from '@mui/icons-material/PendingActions';


const renderStatus = (status) => {

  switch (status) {
    case 'Resolved':
      return (
        <div style={{ color: 'green' , borderRadius:'20px', backgroundColor:'#025c24', color:'#58c482',justifyContent:'center' , height:'34px',display:'flex',alignItems:'center',gap:'14px' }}>
          <DoneIcon /> {status}
        </div>
      );

    case 'Unresolved':
      return (
        <div style={{ color: '#ed872d', backgroundColor:'brown', borderRadius:'20px' ,justifyContent:'center' , height:'34px',display:'flex',alignItems:'center',gap:'14px'}}>
          <CancelIcon /> {status}
        </div>
      );

    case 'Pending':
      return (
        <div style={{ color: '#8ecbfa' , backgroundColor:'#034e87', borderRadius:'20px' , justifyContent:'center' , height:'34px',display:'flex',alignItems:'center',gap:'14px' }}>
          <PendingActionsIcon /> {status}
        </div>
      );
    default:
      return <td>{status}</td>;
  }
};

const Settings = () => {

  const [open, setOpen] = React.useState(false);

const [all_data,set_all_data]=useState([])
const[all_visitor_data,set_visitor_data]=useState([])

//for handling status of visitor
const [option_value,set_option_value]=useState({});
const[submitting_stat,set_submitting_stat]=useState({})


const navigate=useNavigate()
const[user_account_details,set_user_details]=useState({})
const{firstname,lastname,username,address,password,mobile,email,course,subscription_date,price_of_course}={...user_account_details};
const[new_user,set_new_user]=useState({firstname:'',lastname:'',email:'',address:'',mobile:'',course:'',age:'',username:'',password:''})

//For Resposiveness of Button
const[adding_user,set_adding_user]=useState(false);
const[deleting_user,set_deleting_user]=useState(false);
const[deleting_user_id,set_deleting_user_id]=useState('');


const {sidebarOpen , toggleSidebar} = React.useContext(sidebarcontext)

//for cards 
const[all_subscriber , set_all_subscriber]=useState(0);
const[all_visitor , set_all_visitor]= useState(0);
const[resolved_visitor , set_resolved_visitor]=useState(0);
const[pending_visitor , set_pending_visitor]=useState(0);


//dialog box for add new user
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


useEffect(()=>{
  
  const token = JSON.parse(localStorage.getItem("userdata_with_token"));

  axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details` ,{
    headers:{
      Authorization: `Bearer ${token}`  
    }
  })
  .then((res)=>{
    set_user_details(res.data)
  })
  status_option_manage(all_visitor_data)
},[all_visitor_data])


const handleChange = (user_id , event) => {
  set_option_value({...option_value , [user_id] : event.target.value});
}

const handle_course_value=(event)=>{
  set_new_user({...new_user,course:event.target.value})
}

const status_option_manage =(data)=>{
  const get_pending_users = data.filter((data)=>data.status==='Pending')
  const get_resolved_users = data.filter((data)=>data.status==='Resolved')
  set_pending_visitor(get_pending_users.length);
  set_resolved_visitor(get_resolved_users.length)

}


const subscriber_data_fetch =async()=>{
  axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/all_users`)
  .then((res)=>{
      set_all_data(res.data)
      set_all_subscriber(res.data.length);
  })
}

const visitor_data_fetch = async()=>{
  axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`)
  .then((res)=>{
    set_visitor_data(res.data)
    set_all_visitor(res.data.length)
    status_option_manage(res.data)
  })
}

useEffect(()=>{
   
  subscriber_data_fetch();
  visitor_data_fetch();
},[])


const handleDelete = (userId) => {

    set_deleting_user_id(userId)
    const updatedUsers = all_data.filter((user) => user._id !== userId);

    set_all_subscriber(updatedUsers.length);

    set_all_data(updatedUsers);
    set_deleting_user(true)

    axios.delete(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_user/${userId}`)
    .then((res)=>{
      console.log(res);
      if(res.data.id==1)
      {
        //alert('Deleted user successfully')
        set_deleting_user(false)
        set_deleting_user_id('')
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

 

const handle_option=(id,e)=>{

  e.preventDefault();
  set_submitting_stat({...submitting_stat , [id] : true});
   
 
    if(id)
    {
     
      const id_with_option_value={ _id:id, value:option_value[id] }
     
    
      axios.patch(`${process.env.REACT_APP_EXPRESS_URL}/user/update_status`,id_with_option_value)
      .then((res)=>{
        if(res.data.id==1)
        {
          set_visitor_data(prevState =>prevState.map((visitor) => visitor._id === id ?{...visitor,status: option_value[id] } : visitor));
          
          toast.success('Status Update Successfully', {position: "top-right",  autoClose: 2000,  hideProgressBar: false,  closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style:{color:'black'}});
        }
      })
     
    }

    setTimeout(() => {
      set_submitting_stat({...submitting_stat , [id] : false});
    }, 2000);
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

      let converted_age=calculateAge(new_user.age)
      let random_number=Math.floor(Math.random() * 1000) + 1;

      //create unique username
      const string_array_from_email=new_user.email.split("@")
      const generate_new_username=`${string_array_from_email[0]}${random_number} `

      //create unique password
      const generate_new_password=`new_${generate_new_username}`
      const new_updated_user={...new_user,age:converted_age,password:generate_new_password,username:generate_new_username}
  
   if(new_updated_user.username!='')
   { 
         set_adding_user(true);

         axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/add_new_user`,new_updated_user)
         .then((resolve)=>{
       
          if(resolve.data.id==1)
            {
                axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/all_users`)
                  .then((res)=>{
                      set_all_data(res.data)
                      set_all_subscriber(res.data.length)
                  })
              
                  setOpen(false)
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
       
          else if(resolve.data.id==3)
          {
            // alert('Error')
            toast.warning('Already have an Account ', {
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
   }

   else
   {
        toast.warning('Provide Information For Registration', {
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

   set_adding_user(false)
   set_new_user({firstname:'',lastname:'',address:'',mobile:'',course:'',age:'',username:'',email:''})
 
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
    <AdminRouteLayout>
    <div style={{backgroundColor:'#dcdee0' , width:'100vw'}} > 

      <div style={{display:'flex'}}>
       
          <div>
                <Button  
                    variant='contained' 
                    size='large'
                    onClick={toggleSidebar} 
                    sx={{ml:'3px',mb:'10px',mt:'40px',fontSize:'14px',borderRadius:'12px'}} 
                    startIcon={<DensitySmallOutlinedIcon/>}
                    >
                </Button>
          </div>

          <div style={{marginLeft:'190px' , marginTop:'40px'}}>
              <p style={{fontSize:'40px'}}>Welcome, Admin</p>
              <p style={{color:'black',fontSize:'20px'}}>Start day with managing new users</p>
          </div>
         
       </div>

               <div style={{display:'flex',flexDirection:'column'}}>

                       <PaperCard all_subscriber ={all_subscriber} all_visitor={all_visitor} pending_visitor={pending_visitor} resolved_visitor={resolved_visitor} />

                       <div style={{display:'flex', justifyContent:'flex-end', marginRight:'16px'}}>
                            <Button 
                              variant='contained'
                              color='success' 
                              size='large'
                              sx={{borderRadius:'12px'}}
                              onClick={handleClickOpen} 
                              startIcon={<AddIcon/>}
                              >
                                  Add User
                              </Button>
                       </div>
                       
               </div>

    <div className="user-list">
    <table>
      <thead>
        <tr>
          <th>Firstname</th> <th>Lastname</th> <th>Username</th> <th>Age</th>  <th>Email</th> <th>Mobile</th> <th>Address</th> <th>Date-of-Registration</th>
          <th>Course-details</th> <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {all_data.map((user) => (
        
          <tr key={user._id}>
            <td>{user.firstname}</td>  <td>{user.lastname}</td>  <td>{user.username}</td>  <td>{user.age}</td>  <td>{user.email}</td>
            <td>{user.mobile}</td>  <td>{user.address}</td>  <td>{user.date_and_time}</td>  <td>{user.course}</td>
            <td> 
                <AlertDialog  
                    userId={user._id}
                    name = {`${user.firstname} ${user.lastname}`}
                    username={user.username}
                    func={handleDelete}
                    />        
            </td>
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
                    <th>Name</th>  <th>Email</th>  <th>Mobile</th>  <th>Message</th>  <th>Applicant-Status</th>
                    <th>Date-of-Query</th>  <th>Isuue-resolved</th>  <th >Application Status</th>

                        <div style={{display:'flex',justifyContent:'flex-end',marginRight:'-28px'}}>
                            <th>Action</th>
                        </div>
                  </tr>
                </thead>

                <tbody>
                  {all_visitor_data.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td> 
                        <td>{user.email}</td> 
                        <td>{user.mobile}</td> 
                        <td style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'200px'}}>{user.message}</td>
                        <td>{renderStatus(user.status)}</td>
                        <td>{user.date_of_query}</td> 
                        <td>{user.date_of_query_closed}</td>
                     
                      <td style={{backgroundColor:'#dde2eb'}}>
                           <FormControl  sx={{ width: 160,height:60,textAlign:'center' }}>
                    
                                <Select
                                  displayEmpty
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  autoWidth
                                  value={option_value[user._id] || ''}
                                  label="Select Issue status"
                                  onChange={(e)=>handleChange(user._id,e)}
                                  style={{backgroundColor:'#3956cc',color:'white',fontSize:'14px',height:40,marginTop:8}}
                                >
                                    <MenuItem value=""> <em style={{fontSize:'17px',fontWeight:'bolder',textAlign:'center'}}>None</em></MenuItem>
                                    <MenuItem value={'Resolved'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Resolved</MenuItem>
                                    <MenuItem value={'Unresolved'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Unresolved</MenuItem>
                                    <MenuItem value={'Pending'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Pending</MenuItem>
                                  </Select>
                            </FormControl>
                      </td>

                     <td>
                           <Button 
                             onClick={(e)=>handle_option(user._id,e)} 
                             disabled={submitting_stat[user._id]}
                             fullWidth color='success' variant='contained' size='large' 
                             style={{fontSize:'13px',borderRadius:'12px'}}
                             >

                           {submitting_stat[user._id] ? 'Submitting...' : 'Submit'}     
                          </Button>
                      </td> 

                     <td>
                     <AlertDialog  
                        name = {user.name}
                        userId ={user._id}
                        func={handleDelete2}
                    />    
                      </td>
                    </tr>
                 
                  ))}
                </tbody>
              </table>

    </div>
    </Box>

  
    <Dialog open={open} onClose={handleClose} >
    <form onSubmit={handle_form_submission}>
       <DialogTitle sx={{fontSize:'20px',backgroundColor:'#3e82f7',color:'#e6e7f0'}}>New User Registration</DialogTitle>
               <DialogContent sx={{backgroundColor:'#dee2fa'}}>
                    <TextField 
                      inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="firstname"  
                      label="Firstname" 
                      type="text"  fullWidth  variant="standard" 
                      value={new_user.firstname} 
                      onChange={(e)=>set_new_user({...new_user,firstname:e.target.value})} 
                      />

                    <TextField 
                      inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="lastname" 
                      label="Lastname" 
                      type="text"  fullWidth  variant="standard" 
                      value={new_user.lastname} 
                      onChange={(e)=>set_new_user({...new_user,lastname:e.target.value})} 
                      />

                      <TextField  
                        inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="age"
                        type="date"  fullWidth  variant="standard" 
                        value={new_user.age}
                        onChange={(e)=>set_new_user({...new_user,age:e.target.value})} 
                        />
                        
                      <TextField 
                        inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="email"
                        required    label="Email Address"  type="email" 
                        fullWidth  variant="standard"  
                        value={new_user.email} 
                        onChange={(e)=>set_new_user({...new_user,email:e.target.value})}
                        />

                        <TextField  
                          inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="mobile" 
                          label="Mobile"  type="number"  fullWidth  variant="standard" 
                          value={new_user.mobile} 
                          onChange={(e)=>set_new_user({...new_user,mobile:e.target.value})}  
                          />

                        <TextField  
                          inputProps={{style: {fontSize: 16}}} size='medium'  autoFocus  margin="dense"  id="address"
                            label="Address"  type="text"  fullWidth  variant="standard" 
                            value={new_user.address}
                            onChange={(e)=>set_new_user({...new_user,address:e.target.value})} 
                          />
          
                          <label style={{fontSize:19,color:'black'}}>Select Course</label>
                          <Select 
                              displayEmpty='true'
                              labelId="demo-simple-select-label" 
                              id="demo-simple-select" 
                              autoWidth 
                              value={new_user.course}
                              label="Select Issue status"
                              onChange={handle_course_value} 
                              style={{backgroundColor:'#dee2fa',color:'black',fontSize:'14px'}} 
                              >

                      <MenuItem value=""> <em style={{fontSize:'17px',fontWeight:'bolder',textAlign:'center'}}> None </em></MenuItem>
                      <MenuItem value={'Meditation'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Meditation</MenuItem>
                      <MenuItem value={'Yoga'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Yoga</MenuItem>
                      <MenuItem value={'Zumba'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Zumba</MenuItem>
                      <MenuItem value={'Core Workout'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Core Workout</MenuItem>
                      <MenuItem value={'Pro'} style={{width:180,fontSize:'14px',color:'black',fontWeight:'bolder'}}>Pro</MenuItem>
                      
                    </Select>
                  
     
                  </DialogContent>

                  <DialogActions sx={{backgroundColor:'#dee2fa'}}>
                      <Button 
                        size='large' color='error' startIcon={<CancelIcon/>} sx={{borderRadius:'12px',fontSize:'15px'}}
                        onClick={handleClose}
                        variant='contained' 
                      >
                        Cancel
                        </Button>
                      
                      <Button size='large' variant='contained' color='success' sx={{borderRadius:'12px',fontSize:'15px'}}
                          type="submit"
                      >
                      {adding_user ? 'Please Wait...' : 'Submit'}  
                    </Button>
            </DialogActions>
    </form>
  </Dialog>
  
    <footer className='landing_page_footer'>
        {"Powered By Fitness-Training-Studio"}
      </footer>
    </div>
    </AdminRouteLayout>
    
  )
}

export default Settings





 
      
  
 