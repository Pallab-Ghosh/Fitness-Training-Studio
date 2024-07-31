import React, { useEffect, useState } from 'react'
import {InputLabel, Rating,TextField,Typography,Button} from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import axios from 'axios';
import { useStore } from '../store';


const Review = () => {

  const [rating, setrating] = useState(0)
  const [review,setreview]=useState('')
  const[user,set_user]=useState({});
  const { user_email , setUserEmail} = useStore()
  const user_email_id = localStorage.getItem("user_email_id")

  const handle_change=(e,newvalue)=>{
    setrating(newvalue);
}



useEffect(()=>{
  var resolve_data;
  const get_details=async()=>{
    resolve_data =await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/getuser_details`, {
      params: {
         user_email: user_email_id
        }
      })
   // console.log("resolve_data.data from get",resolve_data.data)

    set_user(resolve_data.data);
  }

  get_details();

 },[])




    const handle_review=async()=>{
        console.log(rating)
        console.log(review)
        const {_id}={...user}
        const review_obj={rating:rating,review:review,user_id:_id};
        console.log("review_obj",review_obj)
        if(review_obj.rating!='' || review_obj.review!='')
        {
        const data=await axios.patch(`${process.env.REACT_APP_EXPRESS_URL}/user/update_review`,review_obj)
        }

        setrating(0);
        setreview('')
    } 
    
  return (
    <div style={{display:'flex',flexDirection:'column' ,alignItems:'center',margin:'80px'}}>
    <div style={{fontSize:'25px',color:'#f27a02',margin:'20px'}}>Write a Review</div>

    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
         <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyContent:'center'}}>
             <TextField type='text' sx={{borderRadius:'12px'}}  fullWidth inputProps={{style: {fontSize: 17,maxLength :55}}} value={review} onChange={(e)=>setreview(e.target.value)} />
              <Button  color='warning' onClick={handle_review} variant='contained'  size='large' style={{fontSize:'17px',width:'340px',borderRadius:'12px'}} endIcon={<ReviewsIcon/>}>Give Review</Button> 
        </div>
   
        <div style={{display:'flex',flexDirection:'column', alignItems:'center',margin:'40px'}}>
            <Typography variant='h4' sx={{width:'300px',textAlign:'center'}}>Rate this</Typography>
            <Rating name="simple-controlled" value={rating} sx={{fontSize:'50px'}} onChange={handle_change}  precision={0.5} />
        </div>
     
    </div>
  

    </div>
  )
}

export default Review