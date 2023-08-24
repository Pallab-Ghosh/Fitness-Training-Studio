const express = require('express');
const stripe = require('stripe')(process.env.Secret_key_stripe)

exports.payment=(async (req, res) => {
    const {newdata}=req.body;
    const{id_of_package,title_of_package,price_of_package}=newdata;
    //console.log(id_of_package,title_of_package,price_of_package);

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
    success_url: `${process.env.REACT_URL}/home/get_admission/checkout_success`,
    cancel_url: `${process.env.REACT_URL}/home/get_admission/`,
  });

  res.send({url: session.url});
});

