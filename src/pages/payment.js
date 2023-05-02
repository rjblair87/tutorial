import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function Payment() {
  const location = useLocation();
  const donationID = location?.state?.donationID;
  console.log("paymentID", donationID);

  const [received, setReceived] = useState(0);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState(null); 

  const handlePayment = async (event) => {
    event.preventDefault();

    const donationDocRef = doc(db, "donations", donationID);

    const donationDoc = await getDoc(donationDocRef);
    const currentReceived = donationDoc.data().received;
    const paymentAmount = event.target.paymentAmount.value;
    const newReceived = currentReceived + parseFloat(paymentAmount);

    await updateDoc(donationDocRef, { received: newReceived });

    const randomConfirmationNumber = Math.floor(Math.random() * 1000000); 
    setConfirmationNumber(randomConfirmationNumber);
    setIsPaymentSubmitted(true);
  };
  let navigate = useNavigate();
  const homePage = () => {
    navigate("/");
  };

  return (
    <div className="paymentContainer">
      {!isPaymentSubmitted && (
        <div>
          <div className="createDonationPage">
            Make a Donation
            <div className="createDonationPage">
              Full Name
              <input></input>
            </div>
            <form onSubmit={handlePayment}>
              <div>
                Donation Amount
                <input name="paymentAmount"></input>
              </div>
              <div>
                Credit Card
                <input size = {16}></input>
              </div>
              <div>
                Expiration
                <input size={4}></input>
                CVV
                <input size={4}></input>
              </div>
              <button type="submit">Submit Payment</button>
            </form>
          </div>
        </div>
      )}
      {isPaymentSubmitted && (
        <div>
          <div>Payment Successful!</div>
          <div>Confirmation Number: {confirmationNumber}</div>
          <br></br> 
          <button onClick={homePage}>Return to Home Page</button>
        </div>
      )}
    </div>
  );
}

export default Payment;
