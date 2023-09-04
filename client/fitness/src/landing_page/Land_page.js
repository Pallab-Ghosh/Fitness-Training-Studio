import React from 'react';
import './LandingPage.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import { Typography } from '@mui/material';



const Land_page = () => {
  const navigate=useNavigate()
  return (
    <div className="landing-page">
      <header className='land_page_header'>
        <nav className='land_page_nav'>
          {/* Navigation links */}
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/signin">Already have an account ? Signin</a></li>
            <li><a href="/contact-us">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-content">
          <Typography variant="h1" color='darkred' fontWeight='bold' >
          Fitness Training Studio
          </Typography>
           <p><h4>Your journey to a healthier you starts here.</h4></p> 
            <Button size='lg' style={{backgroundColor:'#ff5500',color: '#ffffff',cursor:'pointer'}} 
            onClick={()=>navigate('/signup')}>New User?Signup</Button>
          </div>
        </section>

       <section className="specialities-section">
          <h2>Our Exercise Specialities</h2>
          <div className="specialities">
          
            <div className="speciality">
              <img src="https://www.themanual.com/wp-content/uploads/sites/9/2021/12/pexels-li-sun-2294361-1.jpg?fit=800%2C800&p=1" alt="Exercise 1" />
              <h3>Cardio Workouts</h3>
            </div>

            <div className="speciality">
              <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2023/04/muscular-man-barbell-bicep-curls.jpg?quality=82&strip=1" alt="Exercise 2" />
              <h3>Strength Training</h3>
            </div>

            <div className="speciality">
              <img src="https://ghost-cms.s3.ap-south-1.amazonaws.com/2022/11/Yoga-For-Man.png" alt="Exercise 3" />
              <h3>Yoga & Meditation</h3>
            </div>

          </div>


          <div className="specialities">

          <div className="speciality">
            <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2015/11/zumba.jpg" />
            <h3>Zumba classes</h3>
          </div>

          <div className="speciality">
            <img src="https://www.healthdigest.com/img/gallery/what-happens-to-your-body-when-you-take-a-spin-class-every-day/intro-1656003195.jpg" alt="Exercise 2" />
            <h3>Spinning Classes</h3>
          </div>

          <div className="speciality">
            <img src="https://www.regymenfitness.com/wp-content/uploads/2021/01/fitness-classes-1080x675.jpg" alt="Exercise 3" />
            <h3> Body conditioning classes</h3>
          </div>

        </div>
  </section> 

      </main>
      <footer className='landing_page_footer'>
        {"Powered By Fitness-Training-Studio"}
      </footer>
    </div>
  );
};

export default Land_page;
