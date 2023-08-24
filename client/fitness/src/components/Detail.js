import React from 'react'
import { Typography,Stack,Button, ListItem} from '@mui/material';
import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';




export const Detail = ({exercisedetail}) => {
  //destructure the exercisedetails data 
  const{bodyPart,gifUrl,name,target,equipment}=exercisedetail;
 
  //create the array of BodyPartImage  TargetImage  EquipmentImage
  const extradetail=[
    {
      icon:BodyPartImage,
      name:bodyPart
    },

    {
      icon:TargetImage,
      name:target,
    },

    {
      icon:EquipmentImage,
      name:equipment,
    }
  ]

  //return the UI of exercisedetails
  return (
    <Stack gap="60px" sx={{flexDirection:{lg:'row'},p:'20px',alignItems:'center'}}>
    <img src={gifUrl} alt='name' loading='lazy' className='detail-image'/>
     
    <Stack sx={{gap:{lg:'35px',xs:'20px'}}}>
      <Typography variant='h2'>
        {name}
      </Typography>

      <Typography variant='h6'>
        Exercises keep you strong and healthy. {name} {` `}
        is one of the best exercises to target your {target}.It will help you to
        improve your mood and gain energy.

      </Typography>
       {
         extradetail.map((item,index)=>(
          <Stack  key={index}   direction='row' gap="24px" alignItems="center">

              <Button sx={{background:'#fff2db',borderRadius:'50%',width:'100px',height:'80px'}}>
                 <img src={item.icon} alt={bodyPart} style={{width:'50px', height:'50px'}}/>
              </Button>
           
              <Typography textTransform="capitalize" variant='h5'>
                  {item.name}
              </Typography>
          </Stack>
         ))
       }
    </Stack>
    </Stack>
  )}
