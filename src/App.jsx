import React from "react";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React, { useState } from 'react';
import Dashboard from "./Pages/Dashboard";
import AddIncome from './Pages/AddIncome';
import AddExpense from './Pages/AddExpense';
import ReportPage from './Pages/Report';
import Settings from './Pages/Settings';
import Signup from "./Pages/Signup";
import Layout from './Components/Layout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./Pages/DashboardPage";
import TransactionsTable from "./Components/TransactionsTable";
 //import Transaction  from "./Components/Transaction";
import DashboardLayout from "./Components/Layout/DashboardLayout";

const App = () => {
   
  return (
    <>
      <ToastContainer />
      <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
     <Route path="/" element={<Layout />}>     
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="Transactions" element={<TransactionsTable/>} />
    <Route path="add-income" element={<AddIncome />} />
    <Route path="add-expense" element={<AddExpense />} />
    <Route path="report" element={<ReportPage/>} />
    <Route path="settings" element={<Settings />} />
      </Route>     
</Routes> 
      </Router>
    </>

  );
};

export default App;

