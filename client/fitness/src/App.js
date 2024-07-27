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
import { create } from 'zustand'


export const sidebarcontext =   React.createContext()
export const token_data     =   React.createContext()
export const programme_data =   React.createContext()
export const login_data =       React.createContext()
 


export const useStore = create((set) => ({
  user_email: '',
  setUserEmail: (email) => set({ user_email: email }),
}));



function App() {
 const[user_token,set_token]=useState('')
 const[user_email , set_email]= useState('');
 const[programme_detail,set_programme]=useState({id_of_package:'',title_of_package:'',price_of_package:''})

 const [sidebarOpen, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};



  return (
   <div>
    <sidebarcontext.Provider value={{sidebarOpen :sidebarOpen , toggleSidebar:toggleSidebar}}>
    <token_data.Provider value={{user_token:user_token,set_token:set_token}}>
    <programme_data.Provider value={{programme_detail:programme_detail,set_programme:set_programme}}>
      <login_data.Provider value={{user_email:user_email , set_email:set_email}}>
       <div className="App">
         <Allroutes/>
       </div>
       </login_data.Provider>
   </programme_data.Provider>
   </token_data.Provider> 
   </sidebarcontext.Provider>
   

   <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggablepauseOnHover theme="colored" style={{fontSize:'16px'}} />
   </div>
 

   
  );
}

export default App;


//"proxy": "https://backend-code-five.vercel.app/",