const express=require('express');
const server=express();
const router_module=require('./router/userR')
const auth_modle=require('./router/auth')
const cors=require('cors');
const bodyparser=require('body-parser')
require('dotenv').config();
const jwt=require('jsonwebtoken')
const stripe=require('stripe')(process.env.Secret_key_stripe)
const payment_module=require('./router/Payment')
//const Payment_module=require('./router/Payment')


 const auth=(req,res,next)=>{
    const status=req.get('Authorization')
    //console.log("status",status)
    if(!status)
    {
        return res.json({id:6})
    }

    else
    {
          const token=req.get('Authorization').split(" ")[1]
          //console.log("token",token);
          const decoded_token=jwt.verify(token,process.env.Jwt_secret_key)
         //console.log(decoded_token)
         if(decoded_token.email)
         {
          next();
         }
         else
         {
            return res.json({id:11,status:'email not verifid with this token'})
         }
    }
   
}
 

server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }));
server.use('/user',router_module.user_router_module)
server.use('/auth',auth_modle.auth_router_module)
server.use('/stripe_payment_page',auth,payment_module.payment_router_module)

//server.use('/stripe_payment_page',Payment_module.payment_router_module)


server.listen(8082,()=>{
    console.log("server started")
})