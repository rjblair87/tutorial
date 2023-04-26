import React from "react";


export function Payment() {

  return (
    <div className="paymentContainer">
      Make a Donation
      <div className="createDonationPage"   >
        Full Name
        <input></input>
      </div>
      <div>
        Donation Amount
        <input></input>
      </div>
      <div>
        Credit Card
        <input></input>
      </div>
      <div>
        Expiration
        <input size={4}></input>
        CVV
        <input size = {4}></input>
      </div>
      <div className="App">
        
      <button className="button">Submit Payment</button>
      </div>
      
    </div>
  );
}

export default Payment;
