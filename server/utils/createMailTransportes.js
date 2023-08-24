const nodemailer=require('nodemailer')

const createMailTransporter=()=>{
  const transporter=nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:'gpallab1997@outlook.com',
        pass:'samsungcorby1997@'
    }
  })
  return transporter
}

module.exports={createMailTransporter};