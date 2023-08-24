import React from 'react'
import { Link } from 'react-router-dom';
import { Button,Stack,Typography } from '@mui/material';


export const ExerciseCard = ({ele}) => {
  //set the UI of exercise
  return (
    <Link className='exercise-card' to={`/home/exercise/${ele.id}`}>
    
          <img src={ele.gifUrl} alt={ele.name} loading='lazy'/ >
      <Stack direction="row">

         <Button sx={{ml:'21px',color:'#fff',background:'#ffa9a9',
          fontSize:'14px',borderRadius:'20px',textTransform:'capitalize'
          }}> {ele.bodyPart}</Button>


          <Button sx={{ml:'21px',color:'#fff',background:'#fcc757',
           fontSize:'14px',borderRadius:'20px',textTransform:'capitalize'
           }}>{ele.target}</Button>
    
          <Typography ml="21px" color='#000' fontWeight="bold" mt='11px' pb='10px' textTransform="capitalize" fontSize='22px'>
           {ele.name}</Typography>

      </Stack>
    </Link>
  )
}
