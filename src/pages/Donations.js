import React, { useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

export function Donations() {
  const [donationList, setDonationList] = useState([]);
  const [donationID, setDonationID] = useState(null);
  const donationCollectionRef = collection(db, "donations");

  let navigate = useNavigate();

  const paymentPage = (id) => {
    setDonationID(id)
    console.log("donationID" , id)
    navigate("/payment",{
      state: { donationID: id }
    });
  };
  
  useEffect(() => {
    const getDonations = async () => {
      const data = await getDocs(donationCollectionRef);
      setDonationList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    console.log("data received");
    getDonations();
  }, []);

  return (
    <div>
      {donationList.map((donation) => {
        return (
          <div className="donationContainer" key={donation.id}>
            <div className="imageSize">
              <img src={donation.imageUrl} />
            </div>
            <div>
              <h1>{donation.foundation}</h1>
            </div>
            <div>{donation.discription}</div>
            <div>Amount Requested ${donation.amountRequested}</div>
            <div>{donation.date}</div>
            {auth.currentUser && auth.currentUser.uid === donation.user.id && (
              <div className="App">
                <button className="button" onClick={() => paymentPage(donation.id)}>
                  Donate Now!!
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Donations;