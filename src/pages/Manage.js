import React, { useEffect } from "react";
import { getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Manage() {
  const [donationList, setDonationList] = useState([]);
  
  const donationCollectionRef = collection(db, "donations");

  const currentUser = auth.currentUser.uid;

 

  const deleteRequest = async (id) => {
    const donationDoc = doc(db, "donations", id);
    await deleteDoc(donationDoc);
    setDonationList((prevList) => prevList.filter((donation) => donation.id !== id));
    console.log("dontion deleted"); 
  };

  useEffect(() => {
    const getDonations = async () => {
      const data = await getDocs(
        query(donationCollectionRef, where("user.id", "==", currentUser))
      );
      setDonationList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDonations();
    console.log("data received");
  }, []);

  return (
    <div>
      {donationList.map((donation) => {
        if (donation.user.id === currentUser) {
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
              <div className="App">
              <button className="button" onClick={() => deleteRequest(donation.id)}>

                  Delete Request
                </button>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Manage;
