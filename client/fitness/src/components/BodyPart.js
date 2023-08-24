import { useForkRef } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { exercise_data_details } from '../pages/Home'
import{Stack,Typography} from '@mui/material';
import Icon from '../assets/icons/gym.png'

export const BodyPart = ({item}) => {
 //use the context of exercise_data_details
  const{setexercises,bodyPart,setbodypart}=useContext(exercise_data_details)
 
//show the bodyparts data in home page
  return (
    <Stack type="button"
    alignItems="center" 
    justifyContent="center"
    className='bodyPart-card'
    sx={{ 
    borderTop:bodyPart===item?'4px solid #ff2625':'',
    backgroundColor:'#fff',
    borderBottomLeftRadius:'20px',
    width:'270px', height:'280px', 
    cursor:'pointer', gap:'47px'}}

    onClick={()=>{ setbodypart(item); window.scrollTo({top:1800,left:100,behavior:'smooth'})}}>

      <img src={Icon} alt='dumbell' style={{width:'40px',height:'40px'}}/>
      <Typography fontSize="24px" fontWeight="bold" color='#3A1212' textTransform='capitalize'>{item}</Typography>

  </Stack>
    
  )
}
