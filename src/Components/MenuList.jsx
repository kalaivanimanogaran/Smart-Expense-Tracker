
import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppstoreOutlined, DollarCircleOutlined,
    PlusCircleOutlined,
    BarChartOutlined,
    SettingOutlined,
    BankOutlined,
    CreditCardOutlined
}

 from '@ant-design/icons';

const { Header } = Layout;

const MenuList = ({ collapsed, setCollapsed }) => {
     const navigate = useNavigate();
       const location = useLocation();
    return (
        <>
               {/* <Layout>
                <Header style={{ padding: 0, background:' #7b97d3',width:"200px"}}>
                    <Button
                        type="text"
                        className="toggle"
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined style={{ color: 'white' }} /> : <MenuFoldOutlined style={{ color: 'white' }} />}
                    />
                    <span style={{ color: 'white', fontSize: '21px', fontWeight: 400 }}> Menu </span>
                </Header>
             </Layout>    */}
             <Menu theme="light"
               mode="inline"
               className="menu-bar"
               selectedKeys={[location.pathname]}
               onClick={({ key }) => navigate(key)
             
            } 
             >
                  <Menu.Item key="/dashboardpage" icon={<AppstoreOutlined/>} > Dashboard</Menu.Item> 
                <Menu.Item key="/transactions" icon={<BankOutlined />} >Transaction</Menu.Item>
                <Menu.SubMenu key="Add transaction" icon={<PlusCircleOutlined />} title="Add Transaction">
               <Menu.Item key="/add-income" className="submenu" icon={<DollarCircleOutlined />} > Add Income</Menu.Item>
               <Menu.Item key="/add-expense" className="submenu" icon={<CreditCardOutlined />} >Add Expense</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="/report" icon={<BarChartOutlined />} > Report</Menu.Item>
                <Menu.Item key="/settings" icon={<SettingOutlined />} > Settings</Menu.Item>
            </Menu>
        </>
    );
};

export default MenuList;
