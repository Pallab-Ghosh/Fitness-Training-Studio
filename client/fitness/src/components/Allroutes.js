import React, { useContext, useEffect, useState } from 'react'
import { Route,Routes,Switch } from 'react-router-dom'
import { Home } from '../pages/Home'
import { ExcercizeDetail } from '../pages/ExcercizeDetail'
import { Signin } from '../pages/Signin'
import { Signup } from '../pages/Signup'
import { Login_email } from '../pages/Login_email'
import { Forget_password } from '../pages/Forget_password'
import { AccordionDetails } from '@mui/material'
import { Account_details } from '../pages/Account_details'

import { login_handler, token_data } from '../App'
import { Programme_page } from '../pages/Enrollment_Programme/Programme_page'
import { Success_page } from '../pages/Enrollment_Programme/Success_page'
import { Not_match_path } from './Not_match_path'
import Reset_old_password from '../pages/Reset_old_password'
import Delete_account from '../pages/Enrollment_Programme/Delete_account'
import Stripe_checkout from '../pages/Enrollment_Programme/Stripe_checkout'
import Admin_Dashboard from '../pages/Admin_Dashboard'
import Contact from '../landing_page/Contact'
import AdminLoginPage from '../pages/AdminLoginPage'
import Settings from '../pages/Settings'
import Landing_page from '../landing_page/Landing_page'






export const Allroutes = () => {


  
  return (
    <>
       <Routes>
       
       <Route path='/' element={<Landing_page/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/contact-us' element={<Contact/>}/>
       <Route path='/signin/forget_password' element={<Forget_password/>}/>
       <Route path='/signin/signup' element={<Signup/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin/login_email' element={<Login_email/>}/>
       <Route path='/signin/admin_login' element={<AdminLoginPage/>}/>

       
       

       { localStorage.getItem("userdata_with_token") ? <Route path='/signin/admin_login/dashboard' element={<Admin_Dashboard/>}/>:
       <Route path='*' element={<Not_match_path/>}/>}
 
       { localStorage.getItem("userdata_with_token")? <Route path='/signin/admin_login/dashboard/settings' element={<Settings/>}/>:
       <Route path='*' element={<Not_match_path/>}/>}
 


       { localStorage.getItem("userdata_with_token")? <Route path='/signin/admin_login/dashboard/home' element={<Home/>}/>:
        <Route path='*' element={<Not_match_path/>}/>}
  

       { localStorage.getItem("userdata_with_token")? <Route path='/home' element={<Home/>}/>:
        <Route path='*' element={<Not_match_path/>}/>}

        { localStorage.getItem("userdata_with_token")? <Route path='/home/accountDetails' element={<Account_details/>}/>:
        <Route path='*' element={<Not_match_path/>}/>}
       

        { localStorage.getItem("userdata_with_token")?  <Route path='/home/accountDetails/reset_password' element={<Reset_old_password/>}/>:
        <Route path='*' element={<Not_match_path/>}/>  }

        { localStorage.getItem("userdata_with_token")? <Route path='/home/accountDetails/delete_account' element={<Delete_account/>}/>:
        <Route path='*' element={<Not_match_path/>}/>}
       
     
       {  localStorage.getItem("userdata_with_token")?  <Route path='/home/exercise/:id' element={<ExcercizeDetail/>}/>:
        <Route path='*' element={<Not_match_path/>}/>   }
  

        {  localStorage.getItem("userdata_with_token")? <Route path='/home/get_admission' element={<Programme_page/>}/>:
          <Route path='*' element={<Not_match_path/>}/>   }

         

        {  localStorage.getItem("userdata_with_token")? <Route path='/home/get_admission/stripe_checkout' element={<Stripe_checkout/>}/>:
          <Route path='*' element={<Not_match_path/>}/>   }
              

       { localStorage.getItem("userdata_with_token") ?  <Route path='/home/get_admission/checkout_success' element={<Success_page/>}/>:
        <Route path='*' element={<Not_match_path/>}/>   }
     
       
       </Routes>
    </>
  )
}
