import React from "react";
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import { useState} from "react";

import "../App.css";



function Login({setIsAuth}) {
    const [signUp, setSignUp] = useState(false);
    let navigate = useNavigate();
 const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            console.log("User Authenticated");
            navigate("/");
        });
        };
        
    return <div className="loginContainer">
        <div>
            <label>Email:</label>
            <input></input>
            <label>Password:</label>
            <input></input>
            <br></br>
            <br></br>
            <button>Login</button>
            </div>
            <br></br>
            <div className="app">or</div>
        <div><p> sign in with google</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        <div>Don't have an account?</div>
        <button >Create an Account</button>
        
        
        </div>;
};

export default Login;