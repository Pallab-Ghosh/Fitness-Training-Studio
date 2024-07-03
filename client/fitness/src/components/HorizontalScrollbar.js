import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { BodyPart } from './BodyPart'
//import {ScrollMenu,VisibilityContext} from 'react-horizontal-scrolling-menu'
import {ScrollMenu,VisibilityContext} from 'react-horizontal-scrolling-menu'
import { exercise_data_details } from '../pages/Home'
import { ExerciseCard } from './ExerciseCard'
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import { Loader } from './Loader'

 



export const HorizontalScrollbar = ({data,isBodyParts}) => {
   if(data.length)
   {
    return (
      //send the date either to bodyPart or ExerciseCard
      <ScrollMenu >
    
      {
          data.map((item)=>(
             <Box key={item.id || item} itemID={item.id || item} title={item.id||item} m="0 40px" >
             {isBodyParts ? <BodyPart item={item}/> : <ExerciseCard ele={item}/>}
             </Box>
          ))
      }
      
      </ScrollMenu>
    )
   }
   else
   {
    <Loader/>
   }
 
}
