import React, { useContext } from 'react'
import { useEffect,useState } from 'react'
import { Pagination } from '@mui/material';
import { Box,Stack,Typography } from '@mui/material';
import { exercisesOptions,fetchData } from '../utils/fetchData';
import { exercise_data_details } from '../pages/Home';
import { ExerciseCard } from './ExerciseCard';
import {Loader} from './Loader'
export const Exercises = () => {
 //use the context of exercise_data_details
  const{setexercises,bodyPart,setbodypart,exercises}=useContext(exercise_data_details)

  //set the current page no for paginate
  const[currentPage,setCurrentPage]=useState(1)

  //total page no for showing results
  const exercisePerPage=9;
  const index_of_last_exercise_no=currentPage*exercisePerPage;
  const index_of_first_exercise_no=index_of_last_exercise_no-exercisePerPage

  const currentexercises=exercises.slice(index_of_first_exercise_no,index_of_last_exercise_no)

   const paginate=(e,value)=>{
   setCurrentPage(value)
   window.scrollTo({top:1800,behavior:'smooth'})
   }

   useEffect(()=>{
      const fun=async()=>{
        let data=[];
        if(bodyPart==='All Sections')
        {
          //fetch the data for all exercises
           data=await fetchData('https://exercisedb.p.rapidapi.com/exercises',exercisesOptions)
        }

        else
        {
          //fetch the data for selected bodyparts
          data=await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exercisesOptions)
        }
        setexercises(data)
      }
     
      fun();

   },[bodyPart])


//loader untill find the results
  if(!currentexercises.length) return <Loader/>
  return (

  <Box id="exercises" sx={{mt:{lg:'110px'}}} mt="50px" p="20px">
    <Typography variant='h3' mb="46px" color="blue">
     Click To Explore
    </Typography>
     
    {/* for showing the results of invidual exercises */}
    <Stack direction='row' sx={{gap:{lg:'110px',xs:'50px'}}}
    flexWrap="wrap" justifyContent="center">
    {
       currentexercises.map((ele,index)=>(
          <ExerciseCard key={index} ele={ele}/>
       ))
    }
    </Stack>

    {/* showing the page no for upcoming results*/}
     <Stack mt="100px" alignItems="center">
     {
      exercises.length > 9 && (
      <Pagination
      color="primary"
      shape='rounded'
      defaultPage={1}
      count={Math.ceil(exercises.length / exercisePerPage)}
      onChange={paginate}
      page={currentPage}
      size="large"
      />
     )
    
    }
     </Stack>
    </Box>
  )

}
