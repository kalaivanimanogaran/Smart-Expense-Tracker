import React from "react"; 
import "./index.css";
import"./App.css";
import { BrowserRouter as Rouder,Route,Routes}from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer,toast}from "react-toastify"

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer/>
    <Rouder>
      <Routes>
        <Route path="/"element={<Signup/>} />
        <Route path="/dashboard"element={<Dashboard/>}/>
      </Routes>
      </Rouder>
      </>
  );
}

export default App;
 