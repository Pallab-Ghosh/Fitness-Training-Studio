import { Rating, Typography } from '@mui/material'
import React from 'react'
import './Rating_and_Review.css'



const Rating_with_Review = ({all_users,speed = 42000 }) => {
  return (
   <div style={{marginTop:'200px',display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
   <div>
   <Typography variant='h2' style={{color:'#068f0d',fontWeight:'bolder',marginBottom:'20px'}}>Success Story</Typography>
   </div>
   
      <div className="wrapper">
      <section className='section_main' style={{ "--speed": `${speed}ms` }}>
        {
            all_users.map(( user ) => (
            <div key={user._id} style={{display:'flex',flexDirection:'column',margin:'18px',backgroundColor:'#f0eceb',border:'1px solid #757478',width:'800px',height:'240px',borderRadius:'34px'}}>
             
                <div style={{display:'flex',flexDirection:'row',marginTop:'15px',marginLeft:'15px'}}>
                    <div style={{margin:'10px',fontWeight:'bolder',fontSize:'20px'}}>{user.firstname} {user.lastname}</div>
                    <div style={{marginLeft:'18px',fontWeight:'bolder',fontSize:'18px',marginTop:'10px',color:'#26252e'}}>{user.review_date} <br/></div>
                </div>

            
                <div style={{margin:'23px' , fontSize:'20px',overflow:'auto'}}>{user.review}</div>
                
                <Rating name="read-only" value={user.rating} readOnly sx={{fontSize:'30px',marginLeft:'15px',marginTop:'50px'}}  />
                </div>
        ))}
      </section>

       <section className='section_main' style={{ "--speed": `${speed}ms` }}>
    {
        all_users.map(( user ) => (
        <div key={user._id} style={{display:'flex',flexDirection:'column',margin:'18px',backgroundColor:'#f0eceb',border:'1px solid #757478',width:'800px',height:'240px',borderRadius:'34px'}}>
         
            <div style={{display:'flex',flexDirection:'row',marginTop:'15px',marginLeft:'15px'}}>
                <div style={{margin:'10px',fontWeight:'bolder',fontSize:'20px',color:'#2b2a2a'}}>{user.firstname} {user.lastname}</div>
                <div style={{marginLeft:'18px',fontWeight:'bolder',fontSize:'18px',marginTop:'10px',color:'#2b2a2a'}}>{user.review_date} <br/></div>
            </div>

        
            <div style={{margin:'23px' , fontSize:'20px',overflow:'auto',color:'#2b2a2a'}}>{user.review}</div>
            {
              user.rating > 0 ? <Rating name="read-only" value={user.rating} readOnly sx={{fontSize:'30px',marginLeft:'15px',marginTop:'50px'}}  />:null
            
            }
            
            </div>
    ))}
  </section>
    </div>

    </div>
  )
}

export default Rating_with_Review