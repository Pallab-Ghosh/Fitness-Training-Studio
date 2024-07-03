const nodemailer=require('nodemailer')

const createMailTransporter=()=>{
  const transporter=nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:'gpallab1997@outlook.com',
        email_password:process.env.email_password
    }
  })
  return transporter
}

module.exports={createMailTransporter};