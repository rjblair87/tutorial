import * as React from "react";

import "./App.css";
//import background from './kcsky.jpeg'
//import {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Donations from "./pages/Donations";
import Login from "./pages/Login";
import Modal from "./Components/Modal";
import Payment from "./pages/payment";
import Manage from "./pages/Manage";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);

      window.location.pathname = "/login";
    });
  };
  return (
    <div  className="bg">
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/create"> Create Donation </Link>
          <Link to="/donations"> Donations </Link>
          {isAuth ? (<Link to="/manage">Manage</Link>) : null}

          
          {!isAuth ? (
            <Link to="/login"> Login </Link>
          ) : (
            <button className="button" onClick={signUserOut}>
              Log Out
            </button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create isAuth={isAuth} />} />
          <Route path="/donations" element={<Donations />}/>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />  
          <Route path="/payment" element={<Payment />}/>
          <Route path="/manage" element={<Manage />}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
