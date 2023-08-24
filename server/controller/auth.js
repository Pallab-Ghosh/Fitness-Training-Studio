const express=require('express');
const mongoose=require('mongoose')
const usermodule=require('../model/user')
const user_Schema=usermodule.user_Schema
const bcrypt=require('bcrypt')
require('dotenv').config();
const emailvalidator = require("email-validator");



exports.signup=async(req,res)=>{
   // console.log(req.body)
     if(req.body.firstname.length===0 || req.body.lastname.length===0 || req.body.username.length===0 || req.body.password.length===0 || req.body.address.length===0 || req.body.email.length===0 || req.body.mobile.length===0)
     {
      return res.json({id:2})
     }
  
  
    else
     {
      const find_user=await user_Schema.findOne({email:req.body.email})
      if(find_user===null)
      {
        const new_user= new user_Schema(req.body);
        const hash=bcrypt.hashSync(req.body.password,10);
        new_user.password=hash;
        const currentDate=new Date();
        const date=currentDate.getDate().toString()
        const month=(currentDate.getMonth()+1).toString()
        const year=currentDate.getFullYear().toString()
        const date_data=`${date}-${month}-${year}`
     
 
       console.log("date_value",date_data)
       new_user.date_and_time=date_data;
        const save_user=await new_user.save();
        console.log("save_user from signup",save_user)
        return  res.json({id:1})
      }

      else
      {
      return  res.json({id:0});
      }
    
     }
  
  }
  