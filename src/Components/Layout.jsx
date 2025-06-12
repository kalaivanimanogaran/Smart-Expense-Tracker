import React from "react";
import MenuList from "./MenuList"; 
import Header from "./Header";      
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
      <div className="content-wrapper">
        <Header />
           <div className="layout-wrapper">
       <MenuList />
      <div className="page-content">
       <Outlet/>
    </div>
    </div>
    </div>
  );
};

export default Layout;
