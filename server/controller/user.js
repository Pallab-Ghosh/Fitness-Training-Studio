const express=require('express');
const mongoose=require('mongoose')
const usermodule=require('../model/user')
const user_Schema=usermodule.user_Schema
const visitor_schema=usermodule.visitor_schema
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { send_verification_mail } = require('../utils/SendverificationMail');
const { parse } = require('dotenv');
require('dotenv').config();
const moment=require('moment')


var find_user_using_email,otp_no;


//get details from account_section_page
exports.get_details=async(req,res)=>{
  if(find_user_using_email)
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
console.log("req",req.body)
 if(req?.body?.username?.length===0 ||req?.body?.password?.length===0  )
  {
    res.json({id:2})
  }

  else
  {
    find_user_using_email=await user_Schema.findOne({username:req.body.username});
    
    if(find_user_using_email)
    {
      console.log(find_user_using_email)
   
                const password_check=bcrypt.compareSync(req.body.password,find_user_using_email.password);
                const token_id=jwt.sign({email:find_user_using_email.email},process.env.Jwt_secret_key)
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
            //console.log("find_user from loginemail ",find_user);
            if(find_user)
            {
              otp_no=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                   
              //console.log("from email verify",otp_no)
              send_verification_mail(find_user,otp_no);
             return  res.json({id:1})
            }            
            else(find_user===null)
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
    if(user_otp==otp_no)
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
if(req?.body?.email===null || req?.body?.new_password2?.length===0 || req?.body?.new_password?.length===0)
  {
   return  res.json({id:2})
  }
  else
  {
    const find_user=await user_Schema.findOne({email:req.body.emailid});
 
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

  }








//login and verify email from signin page

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
               otp_no=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
               //console.log("from email verify",otp_no)
               send_verification_mail( find_user_using_email,otp_no);
              return  res.json({id:1})
             }  

             else( find_user_using_email===null)
               {
                return res.json({id:0})
               }
    
    }
 
 }
 
 exports.verify_email_With_Email=async(req,res) => {
 
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
       const token_id=jwt.sign({email:find_user_using_email.email},process.env.Jwt_secret_key)
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
  

    //delete account
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

   if(find_user_using_email?.course)
   {
    console.log("find_user_using_email.course in if",find_user_using_email.course);
    return res.json({id:1})
   }
   else
   {
    return  res.json({id:2})
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
      console.log(req.body)
      const{id_of_package,title_of_package,price_of_package}=req.body
      if(id_of_package!=null && title_of_package!=null && price_of_package!=null )
      {
        find_user_using_email.course=req.body.title_of_package;
        find_user_using_email.price_of_course=req.body.price_of_package;
        const current_date=date_creation_of_course();
        console.log("current_date",current_date)
        find_user_using_email.subscription_date=current_date
        const new_user=await find_user_using_email.save();
        console.log("new_user from save_course_data",new_user)
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
    find_user=await visitor_schema.findOne({email:req.body.email})
    if(!find_user)
    {
      if(req.body)
      {
          const new_visitor=new visitor_schema(req.body);
           const save_visitor=await new_visitor.save();
           res.json({id:1})
      }
    }
    else
    {
      return res.json({id:2})
    }
   
  }