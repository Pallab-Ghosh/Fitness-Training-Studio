const {createMailTransporter}=require('./createMailTransportes')



 const send_mail_admission=(title_of_package,user,password)=>{

   
    const transporter=createMailTransporter(); 
    const mailOptions={

        from:' "Fitness-Training-Studio" <gpallab1997@outlook.com>',
        to: user.email,
        html: `<h3>Thank you ${user.firstname} ${user.lastname} for enrolling in  our <strong> ${title_of_package} </strong> Programme!!
         Your Username ${user.username} and Password is ${password} for accessing your Account.
                 </h3>`,
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            console.log(error)
        }

        else
        {
            console.log('sent Admission mail')
        }
    })
}

module.exports={send_mail_admission}; 