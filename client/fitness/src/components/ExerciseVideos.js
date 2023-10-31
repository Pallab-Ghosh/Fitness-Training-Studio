import { Box, Stack, Typography } from '@mui/material'
import React from 'react'



export const ExerciseVideos = ({exercisevideos,name}) => {

 //create the UI of exercisevideos data
  if(exercisevideos.length)
  {
    return (
   
      <Box sx={{marginTop:{lg:'50px',xs:'20px'}}} p="20px">
      <Typography variant='h3' mb="33px">
      Click to Watch <span style={{color:'#ff2625',textTransform:'capitalize'}}>{name}</span> exercise videos
      </Typography>
  
      <Stack justifyContent="flex-start" flexWrap="wrap" alignItems="center" sx={{marginLeft:'146px',  flexDirection:{lg:'row'},  gap:{lg:'110px',xs:'0'} }}>
        
        {
          exercisevideos?.slice(0,6).map((item,index)=>(
          <a key={index} 
          className='exercise-video' 
          href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
          target='_blank'
          rel='noreferrer'>
           <img src={item.video.thumbnails[0].url} alt={item.video.title}/>

           <Box>
             <Typography variant='h3' color='black'>
             {item.video.tiile}
             </Typography>
             
             <Typography variant='h6' color='black'>
             {item.video.channelName}
             </Typography>
  
             <Typography variant='h5' color='black'>
             {item.video.lengthText}
             </Typography>
  
             <Typography variant='h5' color='black'>
             {item.video.viewCountText}
             </Typography>
  
           </Box>

          </a>
        ))}
      
      
      </Stack>
      </Box>
    )
  }
 
}
