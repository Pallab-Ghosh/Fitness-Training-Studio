const express=require('express');
const mongoose=require('mongoose')
const usermodule=require('../model/user')
const user_Schema=usermodule.user_Schema
const visitor_schema=usermodule.visitor_schema
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { send_verification_mail } = require('../utils/SendverificationMail');
const {send_mail_subscription}=require('../utils/Send_Mail_For_Subscriptions.js')
const {send_mail_admission}=require('../utils/Send_Mail_For_Admission')
const { parse } = require('dotenv');
require('dotenv').config();
const moment=require('moment')
var generator = require('generate-password');
var randomstring = require("randomstring");

var find_user_using_email,otp_no;


//get details from account_section_page
exports.get_details=async(req,res)=>{
  const email_id = req.body;
  const find_user = await user_Schema.findOne({email:req.body.email_id})
  if(find_user)
  {
    console.log("find_user_using_email from get call",find_user_using_email)
    return res.json(find_user_using_email)
  }
  else
  {
   return  res.json({id:0})
  }
  
}


//sigin from signin page

exports.login=async(req,res)=>{
console.log("req body when signin",req.body)
 if(req?.body?.username?.length===0 ||req?.body?.password?.length===0  )
  {
    res.json({id:2})
  }

  else
  {
    find_user_using_email=await user_Schema.findOne({username:req.body.username});
    
    if(find_user_using_email)
    {
     // console.log(find_user_using_email)
   
                const password_check=bcrypt.compareSync(req.body.password,find_user_using_email.password);
                const token_id=jwt.sign({email:find_user_using_email.email},process.env.Jwt_secret_key)
                console.log("password_check",password_check)
                if(password_check)
                {
                return  res.json({token:token_id});
                }

                else{
                console.log("inner else")
                  return res.send({id:0})
                }
       }
       else
       {
        return res.json({id:7})
       }
  }
}



//forget password from signin page using email to reset password
var find_user;
exports.loginEmail=async(req,res) => {

   if(req?.body?.email?.length===0)
   {
   return res.json({id:2})
   }
   
   else
   { 
          const fetch_email=req.body.email
           find_user=await user_Schema.findOne({email:fetch_email});
            console.log("find_user from loginemail ",find_user);
            if(find_user)
            {
              otp_no=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                   
              //console.log("from email verify",otp_no)
              send_verification_mail(find_user,otp_no);
             return  res.json({id:1 , user_otp:otp_no})
            }  
                      
            else if(find_user===null)
              {
               return res.json({id:0})
              }
   
   }

}

exports.verify_email=async(req,res) => {

  if(req?.body?.otp?.length==null)
  {
    return res.json({id:2});
  }

  else{

    const user_otp=req.body.otp;
    //console.log("user_otp ",user_otp)
    //console.log("otp_no",otp_no)
    if(user_otp)
    {
      //console.log("if from verify")
      return res.json(find_user)
    }
    else
    {
      //console.log("else from verify")
      return res.json({id:0})
    }

  }
    
}



exports.forget_password=async(req,res)=>{
           console.log('req.body for forget_password function',req.body)
    
        const find_user=await user_Schema.findOne({email:req.body.email_Id});
    
        if(find_user===null)
        {
          //console.log("find_user from forget password in else",find_user)
          return res.json({id:0})
        }
        else{
            //console.log("find_user from forget password in else",find_user)
            const hash=bcrypt.hashSync(req.body.new_password2,10);
            find_user.password=hash;
            const newuser= await find_user.save();
            //console.log(newuser);
            return res.json({id:1})
        }
      
      }



//login and verify email from admin signin page

  exports.loginEmailWithEmail=async(req,res) => {

    if(req?.body==null)
    {
    return res.json({id:2})
    }
    
    else
    { 
           const fetch_email=req.body.email
            find_user_using_email=await user_Schema.findOne({email:fetch_email});
             //console.log(" find_user_using_email from loginemail ", find_user_using_email);
             if( find_user_using_email)
             {
              let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
               console.log("from admin email verify",otp)
               send_verification_mail( find_user_using_email,otp);
               return  res.json({id:1 , admin_otp :otp})
             }  

             else if( find_user_using_email===null)
               {
                return res.json({id:0})
               }
    
    }
 
 }
 

 exports.verify_email_With_Email=async(req,res) => {
 
   if(req?.body=='')
   {
     return res.json({id:2});
   }
 
   else{
 
     const user_otp=req.body.otp;
     if(user_otp!='')
     {
      // console.log("if from verify admin verify_email_With_Email ")
       const token_id=jwt.sign({email:req.body.email},process.env.Jwt_secret_key)
       return res.json( {find_user_using_email:find_user_using_email,token:token_id})
     }
     
     else
     {
       //console.log("else from verify")
       return res.json({id:0})
     }
 
   }
     
 }
 


//reset password from accounts_detals section page
 exports.reset_password=async(req,res)=>{
  console.log("req body from reset_password",req.body)
  if(req?.body?.updated_data?.old_password==null || req?.body?.updated_data?.new_password==null || req?.body?.updated_data?.new_password2==null )
    {
     return  res.json({id:2})
    }

    else
    {
      const find_user=await user_Schema.findOne({username:req.body.updated_data.username});
   
      if(find_user===null)
      {
        console.log("find_user from forget password in else",find_user)
         return res.json({id:0})
      }

      else
      {
        const password_check=bcrypt.compareSync(req.body.updated_data.old_password,find_user.password);
        if(password_check)
        {
          console.log("find_user from reset password in else",find_user)
          const hash=bcrypt.hashSync(req.body.updated_data.new_password2,10);
          find_user.password=hash;
          const newuser= await find_user.save();
          //console.log(newuser);
          return res.json({id:1})
        }

        else
        {
          return res.json({id:3});
        }

       }
    
    }
  
    }
  

    //delete account --- to be changed
var account_for_delete
    exports.email_for_delete=async(req,res) => {
           console.log(req.body)
           if(req?.body?.email_id)
           {
            const fetch_email=req.body.email_id
            account_for_delete=await user_Schema.findOne({email:fetch_email});
            otp_no=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            send_verification_mail( account_for_delete,otp_no);
            return  res.json({id:1})
           }
           else{
            res.json({id:2})
           }
  
   }



   exports.verify_email_for_delete=async(req,res) => {
   console.log(req.body,"from verify_email_delete")
    if(req?.body==null)
    {
      return res.json({id:2});
    }
  
    else{
  
      const user_otp=req.body.otp;
      //console.log("user_otp ",user_otp)
      //console.log("otp_no",otp_no)
      if(user_otp===otp_no)
      {
        //console.log("if from verify")
        console.log("account_for_delete",account_for_delete)
         const delete_account=await user_Schema.findOneAndDelete({email:account_for_delete.email});
         console.log("delete account ",delete_account);
         res.json({id:1})
      }
      else
      {
        //console.log("else from verify")
        return res.json({id:0})
      }
  
    }
      
  }
  


  //Course details save to DB

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

exports.get_course_data=async(req,res)=>{

   const {user_email} = req.body;
   console.log('req.body in get_course_data', req.body)

   if(user_email.length)
   {
      console.log('hett')
         const find_user = user_Schema.findOne({email:user_email});
  
   
          if(find_user?.course)
          {
              console.log(" get_course_data if",find_user);
              return res.json({id:1 ,status :'user has already course'})
          }
          else
          {
              console.log("get_course_data else");
              return  res.json({id:2 , status:'user has no course'})
          }
   }
   else
   {
       return  res.json({id:0 , status:'user has no valid email'})
   }
  
  
}


const date_creation_of_course=()=>{
  const currentDate = new Date();
  const oneYearFromNow = new Date(currentDate);
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
  const curr_date=formatDate(currentDate);
  const after_one_year=formatDate(oneYearFromNow);
  const current_date=`${curr_date} - ${after_one_year}`
  return current_date
}


  exports.save_course_data=async(req,res)=>{
      console.log('save_course_data',req.body)
      const{id_of_package,title_of_package,price_of_package,firstname,lastname,email}=req.body
      if(id_of_package!=null && title_of_package!=null && price_of_package!=null )
      {
        find_user_using_email.course=req.body.title_of_package;
        find_user_using_email.price_of_course=req.body.price_of_package;
        const current_date=date_creation_of_course();
       // console.log("current_date",current_date)
        find_user_using_email.subscription_date=current_date
        const new_user=await find_user_using_email.save();
        console.log("new_user from save_course_data",new_user)
        send_mail_subscription(title_of_package,new_user)
        res.json({id:1})
      }
      else
      {
        return res.json({id:2})
      }
     
  }

  //delete course subscriptions
  exports.delete_subscription=async(req,res)=>{
    console.log("req body from delete subscriptions", req.body);
    find_user_using_email.course=null;
    find_user_using_email.price_of_course=0;
    find_user_using_email.subscription_date=null;
    const user_after_delete_data=await find_user_using_email.save()
    console.log(user_after_delete_data);
    res.json({...user_after_delete_data,status_id:1})
  }


  //visitor_data store functions
  var find_visitor

  
  exports.create_visitor=async(req,res)=>{
    console.log(req.body)
   
   
      if(req.body)
      {
          const new_visitor=new visitor_schema(req.body);
          const currentDate=new Date();
          const date=currentDate.getDate().toString()
          const month=(currentDate.getMonth()+1).toString()
          const year=currentDate.getFullYear().toString()
          const date_data=`${date}-${month}-${year}`
          new_visitor.date_of_query=date_data ; 
          new_visitor.status='unsolved'
           const save_visitor=await new_visitor.save();
           res.json({id:1})
      }
  }
    
  

  //get all user details

  exports.get_all_users=async(req,res)=>{
    const all_users=await user_Schema.find({});
    res.json(all_users);
  }


  //delete the user
  exports.delete_user=async(req,res)=>{
     console.log(req.params.id);
     const delete_user=await user_Schema.findByIdAndDelete({_id:req.params.id});
     console.log("delete_user",delete_user)
     res.json({id:1,status:'user deleted successfully'}) 
  }



//get the details of all visitor data
  exports.get_all_visitor_data=async(req,res)=>{
    const all_visitors_data=await visitor_schema.find({});
    res.json(all_visitors_data);
  }


  exports.delete_visitor=async(req,res)=>{
    console.log(req.params.id);
    const delete_visitor=await visitor_schema.findByIdAndDelete({_id:req.params.id});
    console.log("delete_user",delete_visitor)
    res.json({id:1,status:'visitor deleted successfully'}) 
 }

exports.update_visitor_status=async(req,res)=>{
  //console.log(req.body)
  const{_id,value}=req.body
  // console.log(_id,value)
  const find_visitor_by_id=await visitor_schema.findById({_id:_id})
  find_visitor_by_id.status=value;

  const currentDate=new Date();
  const date=currentDate.getDate().toString()
  const month=(currentDate.getMonth()+1).toString()
  const year=currentDate.getFullYear().toString()
  const date_data=`${date}-${month}-${year}`

  find_visitor_by_id.date_of_query_closed=date_data

  find_visitor_by_id.save();
  console.log(find_visitor_by_id);
  res.json({id:1,status:"status update successfully"})
}


//add new user
const get_the_date=()=>{
  const currentDate=new Date();
  const date=currentDate.getDate().toString()
  const month=(currentDate.getMonth()+1).toString()
  const year=currentDate.getFullYear().toString()
  const date_data=`${date}-${month}-${year}`
  return date_data;
}


exports.add_new_user=async(req,res)=>{
 
    if(req.body.firstname==='' ||  req.body.lastname==='' ||  req.body.address===''|| 
       req.body.mobile==='' || req.body.email===''|| req.body.username==='')
    {
     return res.json({id:2})
    }
 
 
   else
    {
        const old_user=await user_Schema.find({email:req.body.email})
        console.log("old_user",old_user)

        if(Object.keys(old_user).length === 0)
        {

          const new_user= new user_Schema(req.body);
          const date_data=get_the_date()
          new_user.date_and_time=date_data;

          let price=0;

          if(req.body.course==='Meditation')
          price=2500;

          else if(req.body.course==='Yoga')
          price=3500;

          else if(req.body.course==='Zumba')
          price=4000;

          else if(req.body.course==='Core Workout')
          price=4800;

          else
          price=5500;

   
          const hash_password=bcrypt.hashSync(req.body.password,10);
          new_user.password=hash_password;

          new_user.course=req.body.course;
          new_user.price_of_course=price;
          const get_subscription_date=date_creation_of_course();
          new_user.subscription_date=get_subscription_date;

          const save_user=await new_user.save();

          send_mail_admission(req.body.course,new_user,req.body.password)
          console.log("save_user from signup",save_user)
          return  res.json({id:1})
        }
        else
        {
          console.log("User has already registered")
          res.json({id:3,status:'User has already registered'})
        }
       
    }
 
 }


 // function for adding the 
 exports.give_review_and_star=async(req,res)=>{

      const {user_id,review,rating}=req.body;
      console.log(user_id,review,rating);
      const date=get_the_date();
      const obj={...req.body,review_date:date}
      console.log(obj)
     const find_user=await user_Schema.findByIdAndUpdate({_id:user_id},obj,{new:true})
   
      console.log(find_user);
      res.json(find_user)
      

 }
 


