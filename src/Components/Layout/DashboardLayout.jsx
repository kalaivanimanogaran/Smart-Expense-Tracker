// //import React from "react";
// import { Link } from "react-router-dom";
// import {Layout,theme,Button} from "antd";
// import Icons from "../Icons";
// import MenuList from "../MenuList"; 
// import "./style.css"; 
// import React, { useState } from "react";
// // import ToggleThemeButton from "../ToggleThemeButton";
// //import {MenuUnfoldOutlined,MenuFoldOutlined}from '@ant-design/icons'
// import { Outlet } from "react-router-dom"; 

// const {Header,Sider,Content} =Layout;
// function DashboardLayout(){
//   // const [darkTheme,setDarkTheme] = useState(true);
//   const [collapsed,setCollapsed] = useState(false);
 


//   // const toggleTheme =()=>{
//   //   setDarkTheme(!darkTheme)
//   // };
//   const{
//     token:{colorBgContainer},
//   }=theme.useToken();
// return(

//    <Layout>
//      <Sider 
//     collapsed={collapsed}
//    collapsible
//   trigger={null}
//     theme={darkTheme ?'dark' :'light'}
//      className="sidebar">
//        <Icons/>
   
//      <MenuList darkTheme={darkTheme} collapsed={collapsed} setCollapsed={setCollapsed} /> 
// {/* 
//      <ToggleThemeButton darkTheme={darkTheme}
//     toggleTheme={toggleTheme}  /> */}
//      </Sider>
//      <Layout>
//          <Header style={{ padding: 0, background: colorBgContainer }} /> 
        
//         <Content style={{  padding: '24px',background: colorBgContainer }}>
//           <Outlet /> 
//         </Content>
//       </Layout>

//   </Layout>
// );
// };


// export default DashboardLayout;


 import { Link } from "react-router-dom";
import { Layout, Button } from "antd";
import Icons from "../Icons";
import MenuList from "../MenuList"; 
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
        <MenuList collapsed={collapsed} setCollapsed={setCollapsed} /> 
      </Sider>
      <Layout>
        <Header style={{ padding: 0 ,background: 'white'}} />
         <Content style={{ padding: '24px', background: '#fff' }}> 
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
