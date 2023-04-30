import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { db } from "../firebase-config";




export function Home() {
    const [donationList, setDonationList] = useState([]);
    const [paymentModal, setPaymentModal] = useState(false);
    const donationCollectionRef = collection(db, "donations");
    
    let navigate = useNavigate();
  
    const paymentPage = () => {
      navigate("/payment");
    };
  
    useEffect(() => {
      const getDonations = async () => {
        const data = await getDocs(donationCollectionRef);
        setDonationList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("data received");
      };
      
      getDonations();
    }, []);
  
    const topDonations = donationList.sort((a, b) => b.amountRequested - a.amountRequested).slice(0, 6);
  
    return (
      
      <div className="homePage">
      <div className="homeContainerWrapper">
        {topDonations.map((donation) => {
          return (
            <div className="homeContainer" key={donation.id}>
              <div className="imageSize"> 
                <img src={donation.imageUrl} alt={null}/>
              </div>
              <div>
                <h1 className="home">{donation.foundation}</h1>
              </div>
              <div className="homeText">{donation.discription}</div>
              <div className="homeText">Amount Requested ${donation.amountRequested}</div>
              <div className="homeText">{donation.date}</div>
              <div className="App">
                <button className="homeButton" onClick={paymentPage}>
                  Donate Now!!
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      
    );
  }
  
  

export default Home;