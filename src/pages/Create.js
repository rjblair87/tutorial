import React, { useEffect } from "react";
import { useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config"
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

 export function Create({isAuth}) {
    const [foundation, setFoundation] = useState("")
    const [discription, setDiscription] = useState("")
    const [amountRequested, setAmountRequested] = useState("")
    const [date, setDate] = useState("")
    const [recieved, setRecieved] = useState(0);
    const [donationsMade, setDonationsMade] = useState(0)
    
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const handleImageUpload = async () => {
        setLoading(true);
        const storageRef = ref(storage, `images/${image.name}`);
        uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL); 
        setLoading(false);         
        }
        
     

    const donationCollectionRef = collection(db, "donations")
    let navigate = useNavigate();
    const createPost = async () => {
        await addDoc(
        donationCollectionRef,{
        foundation, 
        discription, 
        amountRequested, 
        date,
        imageUrl,
        recieved,
        donationsMade,
        user: {name: auth.currentUser.displayName , id: auth.currentUser.uid },
        
    });
    console.log("Successfully added to the console");

    navigate("/donations");
    };
    
    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        };
        if (imageUrl){
            setUpload(true);
        }

    });

    return <div className = " donationContainer">
        <div className="createDonationPage">
            <h1>Create Donation</h1>
            <div className="inputGP">
                <label>Foundation Name   </label>
                <input 
                onChange = {(event)=> {
                setFoundation(event.target.value);
                }} 
                />
            </div>
            <div className="inputGP">
            <label>Description</label>
                <textarea
                onChange = {(event)=> {
                    setDiscription(event.target.value);
                }} 
                 />
            </div>
            <div className="inputGP">
                <label>Amount Requested</label>
                <input 
                 onChange = {(event)=> {
                    setAmountRequested(event.target.value);
                }} 
                />                
            </div>
            <div className="inputGP">
                <label>Date Needed By</label>
                <input type="date" 
                 onChange = {(event)=> {
                    setDate(event.target.value);
                }} 
                />                
            </div>
            {!upload ? (
            <div className="inputGP">
                <label >Upload Picture</label>
                <input type= "file" onChange={handleImageChange} />
                <button onClick={handleImageUpload}> Upload </button>
                {loading && <div className="spinner">Loading...</div>}

                
            </div> ) :
            <div className="upload">
                {image.name} uploaded 
            </div>
            }
            <div className="App">
                <button className="button" onClick={createPost}> Submit Request</button>
            </div>
        </div>
    </div>;
};


export default Create;
