
import { Link } from "react-router-dom";
import {Layout, Button } from "antd";
import Icons from "../Icons";
// import MenuList from "../MenuList"; 
import "./style.css"; 
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; 

const { Header, Sider, Content } = Layout;

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider 
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme="light" 
        className="sidebar"
       >
        <Icons />
        {/* <MenuList collapsed={collapsed} setCollapsed={setCollapsed} />  */}
      </Sider>
       <Layout>
        {/* <Header style={{ padding: 0 ,background: 'white'}} /> */}
          <Content style={{ padding: '24px', background: '#fff' }}> 
          <Outlet /> 
         </Content> 
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
