import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { accountDetails_holder, login_data, programme_data, token_data } from '../App';
import { Box, Typography } from '@mui/material';
import { Stack } from 'rsuite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../components/Loader';
 





export const Account_details = () => {
  
  const[user_account_details,set_user_details]=useState({})

  const{programme_detail,set_programme}=useContext(programme_data);
  const{user_token,set_token}=useContext(token_data)

  const { user_email , set_email} = useContext(login_data)
  const user_email_id = localStorage.getItem("user_email_id")
  const token = JSON.parse(localStorage.getItem("userdata_with_token"));
   

   const navigate=useNavigate()
   const [open, setOpen] = useState(false);
   const [open2, setOpen2] = useState(false);
   const [loading , setloading]=useState(false)


// fetch the account data
   useEffect(()=>{
    
    const get_details=async()=>{

        try 
        {
          setloading(true)
          console.log('user_email',user_email)
          const resolve_data= await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`,
            {
            params: {
               user_email: user_email
              },
              headers:{
                Authorization: `Bearer ${token}`  
              }
            }
          )
          set_user_details(resolve_data.data)
        } 

        catch (error)
          {
          console.log(error)
          }
        finally{
          setloading(false);
        }
    }

    get_details();

   },[user_email])


  
   //for reset password
  const handleClickOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    navigate(`/home/accountDetails/reset_password`)
  };


  //for delete subscriptions

  const handleClickOpen_for_delete_subscription = () => { 
    setOpen2(true);
  };

  const handleClose_for_delete_subscription=()=>{
    setOpen2(false);
  }

  const handleClose_for_delete_subscription2=()=>{
    if(course!=null && subscription_date!=null && price_of_course!=0)
    {
      axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_subscription`)
      .then((res)=>{
        console.log(res.data)
        axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`)
        .then((res)=>{
          set_user_details(res.data)
        })
      
        //alert('Subscription Deleted Successfully')
        toast.success('Subscription Deleted successfully!!!', {
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
      })
      .catch((err)=>{
        console.log(err)
      })
     
    }
    else{

     // alert('No Subscription')
     toast.warning('No Subscription', {
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
  
    setOpen2(false);
  }


   const handle_delete_function=async()=>{
   
    const response=await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/send_email_for_delete`,{email_id:email})
    console.log(response.data)
     if(response.data.id==1)
     {
     // alert('Send otp to email')
     toast.success('Send Otp to your registered Email', {
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
      navigate('/home/accountDetails/delete_account')
     }
     else
     {

      // alert('error')
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
   }

    const delete_subscription_function=()=>{

       
        if(course!=null && subscription_date!=null && price_of_course!=0)
        {
          axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/delete_subscription`)
          .then((res)=>{
            console.log(res.data)
            axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`)
            .then((res)=>{
              set_user_details(res.data)
            })
          
          //  alert('Subscription Deleted Successfully')
          toast.success('Subscription Deleted successfully!!!', {
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


          })
          .catch((err)=>{
            console.log(err)
          })
         
        }
        else{
          alert('No Subscription')
        }
      
   } 


    const handle_admin_page=()=>{
     navigate('/home/accountDetails/dashboard')
    }
    
    if(loading)return <Loader/>
    


    const{firstname,lastname,username,address,password,mobile,email,course,subscription_date,price_of_course}={...user_account_details};

       return (
           <div>
           <Typography variant='h2' sx={{marginLeft:70}}>Accounts Summary</Typography>
           <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
           <div className="container bootstrap snippets bootdeys">
           <div className="row">
             <div className="col-xs-12 col-sm-9">
      
               <form className="form-horizontal">
                   <div className="panel panel-default">
                     <div className="panel-body text-center">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="img-circle profile-avatar" alt="User avatar"/>  
                     </div>
                   </div>
      
                 <div className="panel panel-default">
                   <div className="panel-heading">
                   <h4 className="panel-title">User info</h4>
                   </div>
      
                   <div className="panel-body">
                     <div className="form-group">
                       <label className="col-sm-2 control-label">First Name</label>
                       <div className="col-sm-10">
                         <p className="form-control">{firstname}</p>
                       </div>
                     </div>
                     <div className="form-group">
                       <label className="col-sm-2 control-label">Last Name</label>
                       <div className="col-sm-10">
                         <p className="form-control">{lastname}</p>
                       </div>
                     </div>
                     <div className="form-group">
                       <label className="col-sm-2 control-label">Username</label>
                       <div className="col-sm-10">
                       <p className="form-control">{username}</p>
                       </div>
                     </div>
                   </div>

                 </div>
           
                 <div className="panel panel-default">
                   <div className="panel-heading">
                   <h4 className="panel-title">Contact info</h4>
                   </div>

                   <div className="panel-body">
                     <div className="form-group">
                       <label className="col-sm-2 control-label">Mobile number</label>
                       <div className="col-sm-10">
                       <p className="form-control">{mobile}</p>
                       </div>
                     </div>
                     <div className="form-group">
                       <label className="col-sm-2 control-label">E-mail address</label>
                       <div className="col-sm-10">
                       <p className="form-control">{email}</p>
                       </div>
                     </div>
                     <div className="form-group">
                    
                       <label className="col-sm-2 control-label">Address</label>
                      
                       <div className="col-sm-10">
                       <address><p className="form-control">{address}</p> </address>
                       </div>
                      
                     
                     </div>
                     
                   </div>
                 </div>


                 <div className="panel panel-default">
                 <div className="panel-heading">
                 <h4 className="panel-title">Subscriptions</h4>
                 </div>
    
                 <div className="panel-body">
                   <div className="form-group">
                     <label className="col-sm-2 control-label">Subscriptions</label>
                     <div className="col-sm-10">
                    { course ? <p className="form-control" style={{fontWeight:'bold'}}>{course}</p>:
                    <p className="form-control">{null}</p>
                    }
                     </div>
                   </div>

                   <div className="form-group">
                     <label className="col-sm-2 control-label">Valid Upto</label>
                     <div className="col-sm-10">
                     { subscription_date ? <p className="form-control">{subscription_date}</p>:
                     <p className="form-control">{null}</p>
                    }
                     </div>
                   </div>

                   <div className="form-group">
                   <label className="col-sm-2 control-label">Price</label>
                   <div className="col-sm-10">
                   { price_of_course? <p className="form-control">{price_of_course}</p>:
                   <p className="form-control">{null}</p>
                  }
                   </div>
                 </div>



                   <Stack  justifyContent="space-around" style={{gap:'4px'}}>
                   <Button sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained' size='large' color='error' onClick={()=>navigate(-1)}>Go Back</Button>
                   <Button sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained' size='large' color='success' onClick={handleClickOpen} >Reset password</Button>
                   <Button sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained' size='large' color='primary' onClick={handle_delete_function} >DELETE ACCOUNT</Button>
                   <Button sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained' size='large' color='warning' onClick={handleClickOpen_for_delete_subscription}>Cancel Subscriptions</Button>
                 
                   </Stack>
                  
                 </div>
               </div>
               </form>

                {/* for reset password*/}
              <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title" style={{fontSize:'25px'}}>
                    {"Reset password alert"}
                  </DialogTitle>
               
                  <DialogContent  style={{height:'100px',width:'700px'}}>
                    <DialogContentText id="alert-dialog-description" style={{fontSize:'22px'}}>
                    Do you really want to reset your password ?
                    </DialogContentText>
                  </DialogContent>
               
                  <DialogActions >
                  <Button onClick={handleClose} style={{height:'50px',fontSize:'15px'}} sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained'>Disagree</Button>
                  <Button onClick={handleClose2}  style={{height:'50px',fontSize:'15px'}} autoFocus sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained'> Agree </Button>
                  </DialogActions>
               
               </Dialog>


               {/* for delete subscriptions*/}
             <Dialog open={open2} onClose={handleClose_for_delete_subscription} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title" style={{fontSize:'25px'}}>
                      {"Reset password alert"}
                    </DialogTitle>
               
                    <DialogContent  style={{height:'100px',width:'700px'}}>
                          <DialogContentText id="alert-dialog-description" style={{fontSize:'22px'}}>
                          Do you really want to delete your subscriptions ?
                          </DialogContentText>
                    </DialogContent>
               
                    <DialogActions >
                      <Button onClick={handleClose_for_delete_subscription} style={{height:'50px',fontSize:'15px'}} sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained'>Stay In</Button>
                      <Button onClick={handleClose_for_delete_subscription2}  style={{height:'50px',fontSize:'15px'}} autoFocus sx={{fontSize:'14px',borderRadius:'12px'}} variant='contained'> Delete Subscription </Button>
                    </DialogActions>
               
               </Dialog>

             </div>
           </div>
           </div>
           </div>
         )
   
 
}


