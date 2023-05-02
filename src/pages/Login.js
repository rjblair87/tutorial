import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../App.css";

function Login({ setIsAuth }) {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log("User Authenticated");
      navigate("/");
    });
  };

  const handleSignUp = () => {
    setSignUp(true);
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {        
        const user = userCredential.user;
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        console.log("User created");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert("Passwords don't match")
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        console.log("User Authenticated");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="loginContainer">
      {!signUp ? (
        <div>
          <div>
            <label>Email:</label>
            <input value={email} onChange={handleEmailChange}></input>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange}></input>
            <br></br>
            <br></br>
            <button onClick={handleLogin}>Login</button>
          </div>
          <br></br>
          <div className="app">or</div>
          <div>
            <p> sign in with google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
          <div>Don't have an account?</div>
          <div>
            <button onClick={handleSignUp}>Create an Account</button>
          </div>
        </div>
      ) : (
        <div>
          <label>Email:</label>
          <input value={email} onChange={handleEmailChange}></input>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange}></input>
          <label>Confirm Password:</label>
          <input type="password"></input>
          <br></br>
          <br></br>
          <button onClick={handleCreateAccount}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default Login;
