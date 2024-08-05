
import React, { useContext, useEffect, useState } from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { login_data, programme_data, token_data } from '../../App';

import '../../landing_page/LandingPage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
  

const tiers = [
  {
    title: 'Meditation',
    id:'meditation_id',
    price: 2500,
    description: [
     <p style={{fontSize:'16px'}}>
     <p> <span style={{ fontWeight: 'bold' }}>"How It Works" </span></p>
     <p style={{color:'darkblue',textAlign:'justify'}}> <RadioButtonCheckedIcon/> Meditation, which is the practice of focused concentration, bringing yourself back to the moment over and over again, actually addresses stress, whether positive or negative.</p>
     <p style={{color:'darkblue',textAlign:'justify'}}> <RadioButtonCheckedIcon/> Meditation can also reduce the areas of anxiety, chronic pain, depression</p>
   
     </p>,

     <p style={{fontSize:'16px'}}>
     <p><span style={{ fontWeight: 'bold' }}>"Benefits" </span></p>
     <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Gaining p new perspective on stressful situations.Building skills to manage your stress.Increasing self-awareness.</p>
     <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Focusing on the present.Reducing negative emotions.Increasing imagination and creativity.</p>
 
     </p>
    ],
    buttonText: 'Sign up for free',
    buttonText2: 'Go to payment page',
    buttonVariant: 'contained',
  },

  {

    title: 'Yoga',
    id:'yoga_id',
    price: 3500,
    description: [
     <p style={{fontSize:'16px'}}>
     <p><span style={{ fontWeight: 'bold' }}>"How It works" </span></p>
     <p  style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/>Yoga improves strength, balance and flexibility. </p>
     <p  style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/>Slow movements and deep breathing increase blood flow and warm up muscles,
     while holding p pose can build strength.</p>
     </p>,

     <p style={{fontSize:'16px'}}>
     <p><span style={{ fontWeight: 'bold' }}>"Benefits" </span></p>
     <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>increased flexibility. increased muscle strength and tone. improved respiration, energy and vitality. maintaining p balanced metabolism.</p>
     </p>
    ],
    buttonText: 'Sign up for free',
    buttonText2: 'Go to payment page',
    buttonVariant: 'contained',
  },

  {
    title: 'Zumba',
    id:'zumba_id',
    price: 4000,
    description: [
      <p style={{fontSize:'16px'}}>
      <p> <span style={{ fontWeight: 'bold' }}>"How It Works" </span></p>
      <p  style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/>We take the work out,  by mixing low-intensity and high-intensity moves for an interval-style calorie-burning dance fitness party</p>
   
    </p>,

     <p style={{fontSize:'16px'}}>
      <p><span style={{ fontWeight: 'bold' }}>"Benefits" </span></p>
      <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>A total workout, combining all elements of fitness
      – cardio, muscle conditioning, balance and flexibility,
       boosted energy and p serious dose of awesome each time you leave class </p>
      
      </p>
    ],
    buttonText: 'Sign up for free',
    buttonText2: 'Go to payment page',
    buttonVariant: 'contained',
  },

    {
      title: 'Core Workout',
      id:'workout_id',
      price: 4800,
      description: [
       <p style={{fontSize:'16px'}}>
       <p> <span style={{ fontWeight: 'bold' }}>"How It Works" </span></p>
       <p style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/>Working the core in p functional, progressive manner will give you nice, 
       lean muscles that will be on display once that layer of fat is burned off by doing cardio and cleaning up your diet.
       </p> 
       </p>,

       <p style={{fontSize:'16px'}}>
       <p><span style={{ fontWeight: 'bold' }}>"Benefits" </span></p>
       <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Core exercises improve your balance and stability
       The stomach muscles sometimes are called abs.</p>
       <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Core exercises train the muscles in your core to work in harmony.
       This leads to better balance and steadiness, also called stability. </p>
      
       </p>
      ],
      buttonText: 'Sign up for free',
      buttonText2: 'Go to payment page',
      buttonVariant: 'contained',
    },
  

 
    {
      title: 'Pro',
      id:'pro_id',
      subheader: 'Most popular with Mentorship',
      price: 5500,
      description: [
        <p style={{fontSize:'16px'}}>
        <p><span style={{ fontWeight: 'bold',textAlign:'justify'}}>"How It works" </span></p>

        <p style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/>Yoga works more on the internal organs, muscles and glands and removes the toxins.
        Therefore, it is more effective for detoxification of the body.</p> 

        <p style={{color:'darkblue',textAlign:'justify'}}><RadioButtonCheckedIcon/> Gym training is more about toning muscles and improving cardiovascular performance.</p> 

        </p>,

        <p style={{fontSize:'16px'}}>
        <p><span style={{ fontWeight: 'bold' }}>"Benefits" </span></p>
        <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Yoga is definitely p great choice for improving heart health as it is p process of healing from inside.</p>
        <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>On the other hand, gym training also works on heart health by 
        burning excess calories, but heavy gym training is not recommended for heart patients.</p> 
        <p style={{color:'brown',textAlign:'justify'}}><RadioButtonCheckedIcon/>Yoga works brilliantly on mental health.</p> 
        </p>
        
      ],
      buttonText: 'Sign up for free',
      buttonText2: 'Go to payment page',
      buttonVariant: 'contained',
    },


  ];
  

 
const defaultTheme = createTheme();


export const Programme_page = () => {

  const[user_account_details,set_user_details]=useState({})
  const navigate=useNavigate()

  const {user_token,set_token}=useContext(token_data)
  const {user_email}= useContext(login_data)

  const{programme_detail,set_programme}=useContext(programme_data)
  const token = JSON.parse(localStorage.getItem("userdata_with_token"));
   

 

   const stripe_payment=(newdata , token_id)=>{
    console.log('user_token in stripe_payment' , token_id)
    axios.post(`${process.env.REACT_APP_EXPRESS_URL}/stripe_payment_page/create-checkout-session`,
    { 
    newdata,
    },
    {
      headers: {
        Authorization: `Bearer ${token_id}`
      }
    },
    
    )

    .then((response)=>{
      if(response.data.url)
      {
        //console.log(response.data)
        navigate(response.data.url)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
   }






  const handle_click2=(e,title,id,price)=>{
   
    e.preventDefault();
    const newdata={id_of_package:id,  title_of_package:title,  price_of_package:price,  email:user_email, firstname:user_account_details.firstname , lastname:user_account_details.lastname }
    
    axios.get(`${process.env.REACT_APP_EXPRESS_URL}/user/get_course_details`,{
      
        params: {
           user_email: user_email
          },
         
        
    })

    .then((res)=>{
     
      if(res.data.id==2)
      {
        
        localStorage.setItem("coursedata",JSON.stringify(newdata))
        alert('come')
        stripe_payment(newdata , token);
      }

      else if(res.data.id==0)
      {
        toast.warning('Dont get any valid email id!!!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored",
          style:{color:'black'}
          });
      }
      else{
       // alert('Already Have Subscriptions')
       toast.warning('Already Have Subscriptions with this Account!!!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        style:{color:'black'}
        });
      }
    })
    
 }



  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
    <CssBaseline />
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h3" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Fitness Training Studio
        </Typography>
        <nav>
          
          <Link
            variant="button"
            color="inherit"
            href="#contact"
           
            fontSize='15px'
            sx={{ my: 1, mx: 1.5 }}
            underline='hover'
          >
           <ContactPhoneIcon color='inherit' /> Contact us 
          </Link>

          <Link
          variant="button"
          color="inherit"
          href="/home"
          sx={{ my: 1, mx: 1.5 }}
          underline='hover'
          fontSize='15px'
        >
         <HomeIcon color='inherit' /> Home Page
        </Link>
        
        <Link
          variant="button"
          color="inherit"
          onClick={()=>{
            localStorage.removeItem("userdata_with_token")
            navigate('/')
          }}
          sx={{ my: 1, mx: 1.5 }}
          underline='hover'
          fontSize='15px'
        >
         <ExitToAppIcon color='inherit'/> Sign out
        </Link>
        </nav>

      </Toolbar>
    </AppBar>

    {/* Hero unit */}
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6}}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
       
        gutterBottom
      >
       Pricing <LocalOfferIcon color='success' style={{fontSize:'50px'}}/> 
      </Typography>
      <Typography  sx={{fontSize:'18px'}} align="center"  component="p">
      We have various memberships types to suit your requirement. You will get the most value from fitness 
      when it's part of your everyday life. That's why we offer  12-month membership as standard.
     
      </Typography>
    </Container>

    {/* End hero unit */}
    <Container maxWidth="xl" component="main" style={{backgroundColor:'cadetblue'}} >
      <Grid container spacing={5} alignItems="flex-end" id='pricing'>
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Pro' ? 12 : 6}
            md={4}
          >
            <Card  style={{backgroundColor:"lightblue",width:'400px'}}>

              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center',fontWeight:'bolder' }}
                action={tier.title === 'Pro' ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: 'center',
                  fontSize:'larger'
                }}
                sx={{
               backgroundColor: (theme) =>theme.palette.mode ==='light' ? theme.palette.grey[200] : theme.palette.grey[700], color:'maroon',
             
                }}
              />

              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    <CurrencyRupeeIcon color='inherit'/>{tier.price}/-
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /year
                  </Typography>
                </Box>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>

              <CardActions>
                  <Button fullWidth sx={{fontSize:'14px',borderRadius:'12px'}}
                   variant='contained'
                   onClick={(e)=>handle_click2(e,tier.title,tier.id,tier.price)} 
                   color='error' size='large'
                   >
                  <ShoppingCartIcon /> 
                      {tier.buttonText2}
                </Button>
              </CardActions>
            </Card>

          </Grid>
        ))}
      </Grid>
    </Container>

    {/* Footer */}

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

    <Container
      maxWidth="xl"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 1,
        py: [3, 6],
      }}
    >
   
    <MDBFooter className='text-center text-lg-start text-muted' style={{backgroundColor:'ThreeDFace'}}>
    <section className=''>
      <MDBContainer className='text-center text-md-start mt-5'>
        <MDBRow className='mt-3'>
          <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
            <h1 className='text-uppercase fw-bold mb-4' style={{color:'firebrick'}}>
              Fitness Training Studio
            </h1>
             <br/> 
             <br/> 
            <p style={{fontSize:'18px',color:'dark'}}>
            At <span style={{color:'black',fontWeight:'bolder'}}>Fitness-Training-Studio</span>,we make group workouts fun,
            mental fitness easy with yoga & meditation,and medical & lifestyle care hassle-free.<br/>
            #BeBetterEveryDay
          </p>
          </MDBCol>

          <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
            <h5 className='text-uppercase fw-bold mb-4' style={{fontWeight:'bolder',color:'firebrick'}}>Training</h5>
            <p>
              <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
              Personal training,
              </p>
            </p>
            <p>
              <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
              Small-group and team training,
              
              </p>
            </p>
            <p>
              <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
              Spinning classes,
              
              </p>
            </p>
            <p>
              <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
              Zumba classes,
             
              </p>
            </p>
 
            <p>
            <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
            Cardio classes,
            </p>
          </p>

          <p>
          <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
          Body conditioning classes,
          </p>
        </p>
        <p>
        <p href='#!' className='text-reset' style={{fontSize:['15px'],color:'darkslategray'}}>
        Yoga classes,
        </p>
      </p>


          </MDBCol>

   

          <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
            <h5 className='text-uppercase fw-bold mb-4' style={{fontWeight:'bolder',color:'firebrick'}} id='contact'>Contact</h5>
            <p style={{fontSize:['15px'],color:'darkslategray'}}>
              <BusinessIcon color='secondary'  / >  Ichapur North 24 Parganas
            </p> 
            <p style={{fontSize:['15px'],color:'darkslategray'}}>
              <EmailIcon color="secondary" /> gpallab405@gmail.com
            </p>
            <p style={{fontSize:['15px'],color:'darkslategray'}}>
              <LocalPhoneIcon color="secondary"  /> +91 7980724884
            </p>
            <p style={{fontSize:['15px'],color:'darkslategray'}}>
              <LocalPhoneIcon color="secondary" /> +91 8961475710
            </p>
          </MDBCol>

          <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
          <h5 className='text-uppercase fw-bold mb-4' style={{fontWeight:'bolder',color:'firebrick'}} id='contact'>Timings</h5>
          <p style={{fontSize:['15px'],color:'darkslategray'}}>
           <AccessTimeIcon color='primary' />  MONDAY-- 10.00AM - 8.00PM 
            
          </p> 
          <p style={{fontSize:['15px'],color:'darkslategray'}}>
            
          <AccessTimeIcon color='primary' />  TUESDAY-- 7.00AM - 5.00PM 
          </p>
          <p style={{fontSize:['15px'],color:'darkslategray'}}>
          <AccessTimeIcon color='primary' />  WEDNESDAY-- 9.00AM - 7.00PM 
          </p>

          <p style={{fontSize:['15px'],color:'darkslategray'}}>
          <AccessTimeIcon color='primary' /> THURSDAY-- 11.00AM - 9.00PM 
          </p>

          <p style={{fontSize:['15px'],color:'darkslategray'}}>
          <AccessTimeIcon color='primary' /> FRIDAY-- 12.00PM - 10.30PM 
          </p>
           
          <p style={{fontSize:['15px'],color:'darkslategray'}}>
          <AccessTimeIcon color='primary' /> SATURDAY-- 6.00AM - 9.00PM 
          </p>

          <p style={{fontSize:['15px'],color:'darkslategray'}}>
          <AccessTimeIcon color='primary' /> SUNDAY-- 6.30AM - 11.00PM 
          </p>

        </MDBCol>

          
        </MDBRow>
      </MDBContainer>
    </section>
  </MDBFooter>
 
</Container>
    {/* End footer */}
  </ThemeProvider>
  )
}

