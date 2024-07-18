import logo from './logo.svg';
import './App.css';
import { Allroutes } from './components/Allroutes';
import axios from 'axios';
import React, { useState } from 'react';
import { Programme_page } from './pages/Enrollment_Programme/Programme_page';
import Contact from './landing_page/Contact';
import renderDashboard from './pages/Admin_Dashboard';
import Settings from './pages/Settings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from './Test';



export const sidebarcontext =   React.createContext()
export const token_data     =   React.createContext()
export const programme_data =   React.createContext()
 


function App() {
 const[user_token,set_token]=useState('')
 const[email , set_email]= useState('');
 const[programme_detail,set_programme]=useState({id_of_package:'',title_of_package:'',price_of_package:''})

 const [sidebarOpen, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};

  return (
   <div>
    <sidebarcontext.Provider value={{sidebarOpen :sidebarOpen , toggleSidebar:toggleSidebar}}>
    <token_data.Provider value={{user_token:user_token,set_token:set_token , email:email , set_email:set_email}}>
    <programme_data.Provider value={{programme_detail:programme_detail,set_programme:set_programme}}>
       <div className="App">
         <Allroutes/>
       </div>
   </programme_data.Provider>
   </token_data.Provider> 
   </sidebarcontext.Provider>
   

   <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggablepauseOnHover theme="colored" style={{fontSize:'16px'}} />
   </div>
 

   
  );
}

export default App;


//"proxy": "https://backend-code-five.vercel.app/",