import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SearchExercises } from '../components/SearchExercises'
import { HeroBanner } from '../components/HeroBanner'
import { Exercises } from '../components/Exercises'
import { Layout } from '../components/Layout'
import Review from '../components/Review'




export const exercise_data_details=React.createContext()

export const Home = () => {
  //set exercises and bodyPart state 
  const[exercises,setexercises]=useState([])
  const[bodyPart,setbodypart]=useState('All Sections')


  return (
    <Layout>
    <Box>
       {/* set the HeroBanner component for front page*/}
       
       <HeroBanner/>
       
       {/* pass the data and fucntions to SearchExercises and Exercises component */}
       <exercise_data_details.Provider value={{setexercises:setexercises,bodyPart:bodyPart,setbodypart:setbodypart,exercises:exercises}}>
          <SearchExercises />
          <Exercises/>
      <Review  />
       </exercise_data_details.Provider>
      
     </Box>
     </Layout>
  )
}
