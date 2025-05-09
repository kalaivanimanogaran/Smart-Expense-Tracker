import React from "react"; 
import "./index.css";
import"./App.css";
import { BrowserRouter as Router,Route,Routes}from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer,toast}from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./Pages/DashboardPage";
import DashboardLayout from "./Components/Layout/DashboardLayout";

function App() {

  return (
    <>
   <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/"element={<Signup/>} />
        <Route path="/dashboard"element={<Dashboard/>}/>
        <Route path="/dashboard/Dashboardpage" element={<DashboardPage/>} />
       <Route path="/dashboard" element={<DashboardLayout> <DashboardPage /></DashboardLayout>  }/>
       



      </Routes>
      </Router>
      </>
  );
}

export default App;

