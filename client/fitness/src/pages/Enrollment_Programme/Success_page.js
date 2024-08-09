import React, { useContext, useEffect, useState } from 'react'

import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import { useNavigate ,UNSAFE_NavigationContext } from 'react-router-dom';
import { login_data, programme_data } from '../../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const Success_page = () => {

  const navigate=useNavigate()
  const{programme_detail,set_programme}=useContext(programme_data)
  const{ set_email , user_email}= useContext(login_data)
  const token = JSON.parse(localStorage.getItem("userdata_with_token"));
   


   useEffect(()=>{
    
    let coursedata_from_local_storage=JSON.parse(localStorage.getItem("coursedata"))
    //console.log("coursedata_from_local_storage",coursedata_from_local_storage)
    set_programme({...programme_detail,...coursedata_from_local_storage})
    localStorage.removeItem("coursedata")
   },[])

   //console.log("programme_detail",programme_detail)

   useEffect(()=>{


    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/get_course_details`,{
      headers:{
        Authorization: `Bearer ${token}`  
      }
    })
    .then((res)=>{
     // console.log("res of coursedata",res)
      if(res.data.id==2)
      {
        console.log('programme_detail in success page',programme_detail)
        if(programme_detail?.id_of_package)
        {
          axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/save_course_details`,programme_detail,{
            headers:{
              Authorization: `Bearer ${token}` 
            }
          })
          
          .then((res)=>{
           // console.log(res);
            if(res.data.id==1)
            {
             // alert('Subscribed Successfully')
             toast.success('Subscribed successfully!!!', {
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
        }
      }

    })
 
   },[programme_detail])
  


  return (
    <div>
    <h1>Thanks for your order!</h1>
    <h3>
      We appreciate your initiative!
      If you have any questions, please email at -
       <a href="mailto:gpallab405@gmail.com">gpallab405@gmail.com</a>.
    </h3>


    <div style={{backgroundColor:'white',padding:'60px',borderRadius:'4px',boxShadow: '0 2px 3px #C8D0D8',display:'inline-block',margin:'0 auto'}}>
    <div style={{borderRadius:'200px',height:'200px',width:'200px',backgroundColor:'white',margin:0,}}>
      <CheckIcon color='success' style={{fontSize:'230px' ,marginLeft:'225px'}}/>
    </div>

      <h1 style={{color:'green',fontWeight:'900',fontSize:'40px',marginBottom:'10px'}}>Success</h1> 
      <p style={{color:'green',fontSize:'40px',margin:0,}}>We received your purchase request;<br/> we'll be in touch shortly!</p>

      <Button variant='contained' color='error' size='large' sx={{mt:'15px'}} onClick={()=>navigate('/home')}>go back</Button>
    </div>
    
    

    </div>
  )

}
