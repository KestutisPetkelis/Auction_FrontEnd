import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import AllAuctions from './pages/AllAuctions';
import BidsHistory from './pages/BidsHistory';
import SingleAuction from './pages/SingleAuction';
import CreateAuction from './pages/CreateAuction';
import MyAuctions from './pages/MyAuctions';

import './App.css';

import io from "socket.io-client"         // socket.io klientine dalis
const socket = io.connect("http://localhost:4000")

function App() {

  const divStyle = {
    width: "100%", 
    minHeight: "100vh",
    // border: "1px solid blue",
    marginTop: "0px",
    // marginBottom: "10px",
    // marginLeft: "10px",
    padding: "20px",
    backgroundColor: "aliceblue",
  };

  const [toolbar, setToolbar] = useState((true))
  const [message, setMessage] = useState("")
  const [thisUser, setThisUser] = useState({username:"", money:""})

  return (
    <div className="App" style={divStyle}>
      <BrowserRouter>
      
    <Header toolbar={toolbar} setToolbar={setToolbar} setMessage={setMessage} thisUser={thisUser} setThisUser={setThisUser}/>
      <Routes>
        <Route path="/" element={<Login toolbar={toolbar} setToolbar={setToolbar} 
                  message={message} setMessage={setMessage}
                  setThisUser={setThisUser}/>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/allauctions" element ={<AllAuctions />} ></Route>  
        <Route path="/createauction" element={<CreateAuction/>}/>
        <Route path="/myauctions" element={<MyAuctions/>}/>
        <Route path="/bidshistory" element={<BidsHistory/>}/>
        <Route path="/singleauction/:id" element={<SingleAuction/>}/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
