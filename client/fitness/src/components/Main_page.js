import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import  { Button,ButtonBase, ButtonGroup } from '@mui/material';
import {Box} from '@mui/material'
import { ExcercizeDetail } from './pages/ExcercizeDetail';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';



export const Main_page = () => {
  return (
    <Box width="400px" sx={{width:{xl: '1488px'}}} m="auto"> 
   
    <Navbar/>
    <Routes>
    {/*  set the routes of the application*/}
       <Route path='/' element={<Home/>}/>
       <Route path='/exercise/:id' element={<ExcercizeDetail/>}/>
    </Routes>
    <Footer/>
    </Box>
  )
}




    
    
    