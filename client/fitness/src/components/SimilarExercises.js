import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { HorizontalScrollbar } from './HorizontalScrollbar'
import { Loader } from './Loader'

export const SimilarExercises = ({target_muscle_exercises,equipment_exercises}) => {
 //create the UI of target_muscle_exercises and equipment_exercises
    return (
      <Box sx={{mt:{ lg:'100px',xs:'0'}}}>
       <Typography variant='h3' mb={10} ml={4} sx={{color:'#068f0d',fontWeight:'bolder'}}>Exercises that target the same muscle group</Typography>

        <Stack direction='row' sx={{p:'2',position:'relative'}} >
         {/* send the target_muscle_exercises value to HorizontalScrollbar component  or loader component*/}
        {target_muscle_exercises.length ? <HorizontalScrollbar data={target_muscle_exercises}/> : <Loader/>}
        </Stack>
      

        <Typography variant='h3' mt={18} mb={8} ml={4} sx={{color:'#068f0d',fontWeight:'bolder'}} >Exercises that target the same Equipment</Typography>
        <Stack direction='row' sx={{p:'2',position:'relative'}} >
          {/* send the equipment value to HorizontalScrollbar component or loader component */}
        {equipment_exercises.length ? <HorizontalScrollbar data={equipment_exercises}/> : <Loader/>}
        </Stack>
      
      </Box>
    )
  

}
