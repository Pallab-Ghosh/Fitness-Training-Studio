import React,{useState,useEffect, useContext} from 'react'
import {Box,Button,Stack,TextField,Typography} from '@mui/material'
import { exercisesOptions, fetchData } from '../utils/fetchData'
import { HorizontalScrollbar } from './HorizontalScrollbar'
import { exercise_data_details } from '../pages/Home'
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useDebouncedValue } from '../utils/debounce'
import { useStore } from '../store'
import { Loader } from './Loader'
import { login_data, token_data } from '../App'


//set these 2 array where we store some  values for suggestions in input field
let op=[];
const suggestion_list_value=[];


export const SearchExercises = () => {
 //set the search field for user input 
  let[search,setsearch]=useState('')

  //set the bodyParts for storing the info of bodyParts which came from api 
  const[bodyParts,setbodyparts]=useState([])

//use the value in exercise_data_details which is pass from Home component
  const{setexercises,bodyPart,setbodypart,exercises}=useContext(exercise_data_details)

//set the value state where exercisedata save which is came from api
  const [value,setvalue]=useState([])

 
  //set the state of button  disable for some time while showing input to users
  const[btn_disable,set_btn_disable]=useState(false);

  //set the state of select to select the value
  const[select,setselect]=useState("")
  const { user_email } = useContext(login_data)




  useEffect(()=>{
 
     console.log('user_email',user_email)
    const fetchExercisesData=async()=>{
      //fetch the data one time for bodyparts section which is in main page of applications
     const bodyPartsdata=await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exercisesOptions)
     setbodyparts(['All Sections',...bodyPartsdata])
    // console.log('bodyPartsdata',bodyPartsdata)
      
      //fetch the data for exercises section in main page of application
      const exercisesData=await fetchData('https://exercisedb.p.rapidapi.com/exercises',exercisesOptions)
      //console.log('exercisesData',exercisesData)
      setvalue(exercisesData)

      //store the data of target attribute of all objects in suggestion_list_value
       for(let p of exercisesData)
        {
         suggestion_list_value.push(p.target);
         suggestion_list_value.push(p.equipment);
        }
    

         // Using Set to remove duplicates
        op = [...new Set(suggestion_list_value)];
     
        //store all the bodyParts data in op array for suggestions
        for(let p of bodyPartsdata)
        {
         op.push(p)
        }
   
     }

  // console.log("useeffect1 called")
     fetchExercisesData();
  },[])



  //handlesearch function when user search anything about exercises
  const handlesearch=async(e)=>{

    e.preventDefault()
    set_btn_disable(true)
    if(search)
     {
      toast(`Please wait...`)
      search=search.toLowerCase().split(" ").join("");
       
       //store the filter value if search keywords founds in exercisedata
    /*     const searchexercises= value.filter((ele)=>(
          ele.bodyPart.toLowerCase().split(" ").join("").includes(search)||
          ele.equipment.toLowerCase().split(" ").join("").includes(search)||
          ele.name.toLowerCase().split(" ").join("").includes(search)|| 
          ele.target.toLowerCase().split(" ").join("").includes(search)
      )) */

          const data = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`,exercisesOptions)
        // console.log('searchexercises',searchexercises)
          setsearch('')
          setexercises(data);
          set_btn_disable(false);
     }
} 

if(!localStorage.getItem('user_login_email')) return <Loader/>
 

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px" >
         <Typography fontWeight={700} sx={{fontSize:{lg:'44px', xs:'30px'}}} mb='50px' textAlign="center">
    
                Awesome Exercises You <br/> 
                  Should Know
          </Typography>
    
       <Box position="relative" mb="78px">

            <TextField sx={{
              input:{fontWeight:'700',border:'none',borderRadius:'4px'},
              width:{lg:'800px',xs:'350px'},
              backgroundColor:'#fff',
              borderRadius:'40px', }}
              inputProps={{style: {fontSize: 15}}}
              height="76px"
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
              placeholder='Search Exercises'
              type='text'
          />
   {/*showing the list of sesrch keyword */}


   {/*button for search results */}
                  <Button 
                    className='search-btn'
                    sx={{  bgcolor:'#FF2625',  color:'#fff',  textTransform:'none',  width:{lg:'170px',xs:'80px'},  fontSize:{lg:'20px',xs:'14px'},  height:'56px',  position:'absolute',borderRadius:'12px' }}
                    disabled={btn_disable}
                    onClick={handlesearch} 
                    endIcon={<ZoomInIcon/>} >Search</Button>    
                  
                    <Toaster 
                    toastOptions={{
                      className: '',
                      style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: 'white',
                        backgroundColor:'green'
                      },
                    }}

                    />
              <div className="select">
                  Seacrh Item : <span className="selected">{search}</span>
              </div>

     
     </Box>

              <Box sx={{position:'relative',width:'100%',p:'20px',mt:"100px"}}>
                  <HorizontalScrollbar data={bodyParts} isBodyParts/>
              </Box>

    </Stack>
  )
}
