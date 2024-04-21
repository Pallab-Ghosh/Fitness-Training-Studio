const express = require('express');
const stripe = require('stripe')(process.env.Secret_key_stripe)
const { send_mail_subscription } = require('../utils/Send_Mail_For_Subscriptions');


exports.payment=(async (req, res) => {
    const {newdata}=req.body;
    const{id_of_package,title_of_package,price_of_package,email,firstname,lastname}=newdata;
    console.log(id_of_package,title_of_package,price_of_package,email,firstname,lastname);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: title_of_package,
          },
          unit_amount: price_of_package*100,
        },
        quantity: 1,
      },
    ],
    phone_number_collection:{
      enabled:true
    },
    mode: 'payment',
    success_url: `${process.env.REACT_URL}/home/get_admission/checkout_success/?success=1`,
    cancel_url: `${process.env.REACT_URL}/home/get_admission/?cancel=1`,
  });

  
  res.send({url: session.url});
});

