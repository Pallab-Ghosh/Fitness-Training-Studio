import logo from './logo.svg';
import './App.css';
import { Allroutes } from './components/Allroutes';
import axios from 'axios';
import React, { useState } from 'react';
import { Programme_page } from './pages/Enrollment_Programme/Programme_page';
import Land_page from './landing_page/Land_page';
import Contact from './landing_page/Contact';
import renderDashboard from './pages/Admin_Dashboard';



export const token_data=React.createContext()
export const programme_data=React.createContext()
function App() {
 const[user_token,set_token]=useState('')
 const[programme_detail,set_programme]=useState({id_of_package:'',title_of_package:'',price_of_package:''})
  return (



      <token_data.Provider value={{user_token:user_token,set_token:set_token}}>
    <programme_data.Provider value={{programme_detail:programme_detail,set_programme:set_programme}}>
        <div className="App">
          <Allroutes/>
        </div>
    </programme_data.Provider>
    </token_data.Provider> 
    
    
  );
}

export default App;


//"proxy": "https://backend-code-five.vercel.app/",