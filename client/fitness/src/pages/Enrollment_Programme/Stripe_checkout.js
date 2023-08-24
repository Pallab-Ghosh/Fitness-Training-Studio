import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { programme_data } from "../../App";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NWzeSSG0PFKfjpDLOo85rwCyh19263XHoBVtKeNXmcQ255cRe4SiCpWIE6gGUi40eK7i00hB1V7KqnEvkWdY7ah00fLPGurYI");

export default function Stripe_checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const{programme_detail,set_programme}=useContext(programme_data)



  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log(programme_detail.item_id,programme_detail.item_title,programme_detail.item_package)
    fetch("http://localhost:8082/stripe_payment_page/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ totalamount: programme_detail.item_package }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };




  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}