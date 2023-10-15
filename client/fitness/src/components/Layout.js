import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import '../landing_page/LandingPage.css'


export const Layout = ({children}) => {
  return (
    <div>
    <Navbar/>
  <main>{children}</main>

  <footer className='landing_page_footer'>
  {"Powered By Fitness-Training-Studio"}
</footer>
    </div>
  )
}
