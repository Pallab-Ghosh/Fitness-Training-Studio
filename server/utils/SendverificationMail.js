const {createMailTransporter}=require('./createMailTransportes')

const send_verification_mail=(user,otp_no)=>{
    const transporter=createMailTransporter();

    const mailOptions={

        from:' "FitnessTracker" <gpallab1997@outlook.com>',
        to: user.email,
        html: `<p>Hello ${user.firstname}, Your One-Time-Password is ${otp_no}</p>`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            console.log(error)
        }

        else
        {
            console.log('sent mail')
        }
    })
}

module.exports={send_verification_mail};