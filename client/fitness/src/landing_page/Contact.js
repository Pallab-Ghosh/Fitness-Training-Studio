
import React, { useState } from 'react';
import './ContactPage.css'; // Import your CSS file for styling
import { Box, TextField, Typography ,Button} from '@mui/material';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contact = () => {
  const[visitor_data,set_visitor_data]=useState({name:'',mobile:'',message:'',email:''})
  const [submitting, setSubmitting] = useState(false);

 const handle_visitor_data_submit=(e)=>{
   e.preventDefault();
   console.log(visitor_data)

   //check object is empty or not
  
    axios.post(`${process.env.REACT_APP_EXPRESS_URL}/user/visitor_data`,visitor_data)
    .then((res)=>{
     console.log(res)
     if(res.data.id===1)
     {
      toast.success('Submitted Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style:{color:'black'}
        });
     }
   
    })
   
  
  
   set_visitor_data({name:'',mobile:'',message:'',email:''})
   setSubmitting(true)
   setTimeout(() => {
        
    setSubmitting(false);
   }, 4000);
 }

  return (
    <div className="contact-page">
     
      <main>
        <section className="contact-section">
            <Typography variant='h2' color='red' >Contact Us</Typography>
            <Typography variant='h5'  >We'd love to hear from you. Reach out to us using the form below.</Typography>
            <form className='contact_form' onSubmit={handle_visitor_data_submit}> 
  
              <div className="contact_form-group">
                <TextField
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                 inputProps={{style: {fontSize: 15}}}
                 value={visitor_data.name}
                 onChange={(e)=>set_visitor_data({...visitor_data,name:e.target.value})}
              />
              </div>
  
              <div className="form-group">
              <TextField
              fullWidth
              name="email"
              label="Email"
              type='email'
              required
              id="email"
               inputProps={{style: {fontSize: 15}}}
               value={visitor_data.email}
               onChange={(e)=>set_visitor_data({...visitor_data,email:e.target.value})}
            />
              </div>
  
              <div className="form-group">
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                type='number'
                id="mobile"
                required
                multiline
                inputProps={{style: {fontSize: 15}}}
                value={visitor_data.mobile}
                onChange={(e)=>set_visitor_data({...visitor_data,mobile:e.target.value})}
            />
              </div>
  
              <div className="form-group">
              <TextField
                fullWidth
                name="message"
                label="Message"
                type="text"
                id="message"
                multiline
                inputProps={{ style: {fontSize: 15},maxLength :55 }}
                value={visitor_data.message}
                onChange={(e)=>set_visitor_data({...visitor_data,message:e.target.value})}
            />
              </div>
  
          <Button size='lg' variant="contained" type="submit" color='primary'  disabled={submitting}>
          {submitting ? 'Submitting...': 'Submit'}
          </Button>
            </form>
        </section>
      </main>

      <Box sx={{mt:'138px'}}>
            <footer className='contact_footer'>
            {"Powered By Fitness-Training-Studio"}
          </footer>
      </Box>
    
    </div>
  );
};

export default Contact;
