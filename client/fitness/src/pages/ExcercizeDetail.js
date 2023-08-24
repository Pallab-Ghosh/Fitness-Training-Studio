import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { exercisesOptions,fetchData, youtubeoptions } from '../utils/fetchData'
import {Detail} from '../components/Detail';
import { ExerciseVideos } from '../components/ExerciseVideos'
import {SimilarExercises} from '../components/SimilarExercises'
import { Layout } from '../components/Layout'

export const ExcercizeDetail = () => {
  //set the state for a particular exercises
  const[exercisedetail,setexercisedetail]=useState({});

  //set the state for selected exercise video
  const [exercisevideos,setexercisevideos]=useState([])

  //set the state for target muscle
  const[target_muscle_exercises,set_target_muscle_exercises]=useState([])

  //set the state for target equipment
  const[equipment_exercises,set_euipment_exercises]=useState([])

  //get the id in params
  const {id}=useParams()


  useEffect(()=>{
   const fetchexercisesdata=async()=>{
    const exercisedburl= 'https://exercisedb.p.rapidapi.com'
    const youtubesearchurl='https://youtube-search-and-download.p.rapidapi.com'

    //get the value by fetch for exercise detail
    const exercisedetaildata=await fetchData(`${exercisedburl}/exercises/exercise/${id}`,exercisesOptions)
    setexercisedetail(exercisedetaildata)

    //get the data for exercise videos
    const exercisevideosdata=await fetchData(`${youtubesearchurl}/search?query=${exercisedetaildata.name}`,youtubeoptions)
    setexercisevideos(exercisevideosdata.contents)

    //get the data by fetch for target muscle 
    const target_muscle_exercises_data=await fetchData(`${exercisedburl}/exercises/target/${exercisedetaildata.target}`,exercisesOptions)

    //get the exercises data similar to equipment 
    const equipment_exercises_data=await fetchData(`${exercisedburl}/exercises/equipment/${exercisedetaildata.equipment}`,exercisesOptions)

    set_target_muscle_exercises(target_muscle_exercises_data)
    set_euipment_exercises(equipment_exercises_data)
    
   }

   fetchexercisesdata()

  },[id])



  return (
    <Layout>
    <Box>
      {/* send the exercise data to Detail component */}
      <Detail  exercisedetail={exercisedetail}/>

        {/* send the exercisevideos data to ExerciseVideos component */}
      <ExerciseVideos exercisevideos={exercisevideos} name={exercisedetail.name}/>

        {/* send the targetmuscle and equipment_exercises  data to SimilarExercises component */}
      <SimilarExercises target_muscle_exercises={target_muscle_exercises} equipment_exercises={equipment_exercises}/>
    </Box>
    </Layout>
  )
}
