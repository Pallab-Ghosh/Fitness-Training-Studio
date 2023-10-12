import React from 'react'
import {InputLabel, Rating,TextField,Typography} from '@mui/material';
import { Button } from 'rsuite';


const Review = ({input,setinput,value,setValue,handle_change}) => {



    const handle_review=()=>{
        console.log(input)
    }
    
  return (
    <div style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
    <div style={{fontSize:'25px'}}>Write a Review</div>

    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
         <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyContent:'center'}}>
             <TextField type='text' fullWidth inputProps={{style: {fontSize: 17}}} value={input} onChange={(e)=>setinput(e.target.value)} />
             <Button  color='green' onClick={handle_review} variant='contained'  size='large' style={{fontSize:'17px',width:'200px'}} >Give Review</Button>
        </div>
   
        <div style={{display:'flex',flexDirection:'column', alignItems:'center',margin:'40px'}}>
            <Typography variant='h4' sx={{width:'300px',textAlign:'center'}}>Rate this</Typography>
            <Rating name="simple-controlled" value={value} sx={{fontSize:'50px'}} onChange={handle_change}  precision={0.5} />
        </div>
     
    </div>
  

    </div>
  )
}

export default Review