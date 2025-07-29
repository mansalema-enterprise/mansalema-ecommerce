import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
import { useState } from "react";
import Login from "./Components/Login/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from "react";

export const backendUrl = "https://mansalema-ecommerce.onrender.com"
export const currency = "R"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() =>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className="app-container">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <div className="app-content">
            <Sidebar setToken={setToken}/>
            <div className="page-content">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
