// import React from 'react';
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import {Menu,Layout ,Button} from 'antd';
// import {AppstoreOutlined, DollarCircleOutlined,
//     PlusCircleOutlined,
//     BarChartOutlined,
//     SettingOutlined,
//     BankOutlined,
//     CreditCardOutlined
//     ,} from '@ant-design/icons'
// const {Header}=Layout;
//  const MenuList = ({ collapsed,setCollapsed}) =>
//     {
//     // const [collapsed, setCollapsed] = useState(false);
//     //const colorBgContainer = darkTheme ? '#001529' : '#fff';
  
//     return(
         
//         <>
//         <Layout>
//         <Header style={{padding:0, background: 'linear-gradient(180deg, #244283, #4c668f)' }}> 
//           <Button type="text"
//            className="toggle"
//            onClick={()=>setCollapsed(!collapsed)}
//            icon={collapsed ?<MenuUnfoldOutlined style={{ color: 'white' }}/>:<MenuFoldOutlined style={{ color: 'white' }}/>}>
//          </Button>
//            <span style={{  color: darkTheme ? 'white' : 'black', fontSize: '20px',fontWeight:400}}> Menu </span>
//         </Header>
//       </Layout>
//         <Menu theme={darkTheme ? 'dark' :'light'} mode="inline" className='menu-bar' >   
//             <Menu.Item  key="dashboard" icon = {<AppstoreOutlined/>} > Dashboard</Menu.Item>
//             <Menu.Item  key="Transaction" icon = {<BankOutlined/>} > Transaction</Menu.Item>
//             <Menu.SubMenu key="Add transaction" icon = {< PlusCircleOutlined/>} title="Add Transaction" > 
//             <Menu.Item key="Add income"  className="submenu"icon={<  DollarCircleOutlined/>}>Add Income</Menu.Item>
//             <Menu.Item key="AddExpense"  className="submenu"icon={< CreditCardOutlined/>}>Add Expense </Menu.Item>
//             </Menu.SubMenu>
//             <Menu.Item  key="Report" icon = {< BarChartOutlined/>} > Report</Menu.Item>
//             <Menu.Item  key="Settings" icon = {< SettingOutlined/>} > Settings</Menu.Item>


//         </Menu>
//         </>
//     )
// }

// export default MenuList;  

import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { AppstoreOutlined, DollarCircleOutlined,
    PlusCircleOutlined,
    BarChartOutlined,
    SettingOutlined,
    BankOutlined,
    CreditCardOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const MenuList = ({ collapsed, setCollapsed }) => {
    return (
        <>
            <Layout>
                <Header style={{ padding: 0, background:' #7b97d3'}}>
                    <Button
                        type="text"
                        className="toggle"
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'white' }} /> : <MenuFoldOutlined style={{ color: 'white' }} />}
                    />
                    <span style={{ color: 'white', fontSize: '20px', fontWeight: 400 }}> Menu </span>
                </Header>
             </Layout>
             <Menu theme="light" mode="inline" className="menu-bar">
                 <Menu.Item key="dashboard" icon={<AppstoreOutlined/>}> Dashboard</Menu.Item>
                <Menu.Item key="Transaction" icon={<BankOutlined />}> Transaction</Menu.Item>
                <Menu.SubMenu key="Add transaction" icon={<PlusCircleOutlined />} title="Add Transaction">
                    <Menu.Item key="Add income" className="submenu" icon={<DollarCircleOutlined />}>Add Income</Menu.Item>
                    <Menu.Item key="AddExpense" className="submenu" icon={<CreditCardOutlined />}>Add Expense</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="Report" icon={<BarChartOutlined />}> Report</Menu.Item>
                <Menu.Item key="Settings" icon={<SettingOutlined />}> Settings</Menu.Item>
            </Menu>
        </>
    );
};

export default MenuList;
