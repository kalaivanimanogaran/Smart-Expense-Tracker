
import React, { useState } from 'react';
import {
  Tabs,
  Form,
  Input,
  Upload,
  Button,
  Descriptions,
  message,
  Card,
  Table,
  Modal,
  Switch,
  Select
} from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

const SettingsPage = () => {
  const [activeKey, setActiveKey] = useState('company');
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Vyoobam Tech',
    address: '122/1, 1st Cross Street, Vivekananda Nagar, Kumbakonam',
    gst: '33ABCDE1234F1Z5',
    contact: 'admin@vyoobam.com | +91 9003179142',
    logo: null,
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'kalai', email: 'kalaivanimanogaran686@gmail.com', role: 'Intern' },
    { id: 2, name: 'manisha', email: 'manisha07@gmail.com', role: 'SE' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userForm] = Form.useForm();

  const [categories, setCategories] = useState([
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Data Analtics' },
    { id: 3, name: 'Mobile app development' },
    { id: 4, name: 'Full stack development' },

  ]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryForm] = Form.useForm();

  const onTabChange = (key) => setActiveKey(key);

  const handleSaveCompanyInfo = (values) => {
    const updatedLogo = values.logo || companyInfo.logo;
    setCompanyInfo({ ...values, logo: updatedLogo });
    message.success('Company info updated!');
    setEditMode(false);
  };

  const handleUserSave = (values) => {
    const formattedRole = values.role.charAt(0).toUpperCase() + values.role.slice(1).toLowerCase();
    if (currentUser) {
      setUsers(users.map(u => (u.id === currentUser.id ? { ...u, ...values, role: formattedRole } : u)));
      message.success('User updated!');
    } else {
      const newUser = { id: Date.now(), ...values, role: formattedRole };
      setUsers([...users, newUser]);
      message.success('User added!');
    }
    closeModal();
  };

  const confirmDeleteUser = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setUsers(users.filter(user => user.id !== id));
        message.success('User deleted!');
      }
    });
  };

  const showUserModal = (user = null) => {
    setCurrentUser(user);
    if (user) userForm.setFieldsValue(user);
    else userForm.resetFields();
    setIsModalVisible(true);
  };

  const closeModal = () => {
    userForm.resetFields();
    setCurrentUser(null);
    setIsModalVisible(false);
  };

  const showCategoryModal = (category = null) => {
    setCurrentCategory(category);
    if (category) categoryForm.setFieldsValue(category);
    else categoryForm.resetFields();
    setIsCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    categoryForm.resetFields();
    setCurrentCategory(null);
    setIsCategoryModalVisible(false);
  };

  const handleCategorySave = (values) => {
    if (currentCategory) {
      setCategories(categories.map(cat => cat.id === currentCategory.id ? { ...cat, ...values } : cat));
      message.success('Category updated!');
    } else {
      const newCategory = { id: Date.now(), ...values };
      setCategories([...categories, newCategory]);
      message.success('Category added!');
    }
    closeCategoryModal();
  };

  const confirmDeleteCategory = (id) => {
    confirm({
      title: 'Are you sure you want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setCategories(categories.filter(cat => cat.id !== id));
        message.success('Category deleted!');
      }
    });
  };

  const userColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => showUserModal(record)}>Edit</Button>{' '}
          <Button size="small" danger onClick={() => confirmDeleteUser(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const categoryColumns = [
    { title: 'Category Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button size="small" onClick={() => showCategoryModal(record)}>Edit</Button>{' '}
          <Button size="small" danger onClick={() => confirmDeleteCategory(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const normFile = (e) => (e?.fileList || []);

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>Settings</h1>
      <Tabs activeKey={activeKey} onChange={onTabChange} type="card">
        <TabPane tab="Company Info" key="company">
          <Card
            title="Company Information"
            extra={!editMode && (
              <Button type="primary" onClick={() => {
                form.setFieldsValue(companyInfo);
                setEditMode(true);
              }}>
                Edit Info
              </Button>
            )}
          >
            {editMode ? (
              <Form form={form} layout="vertical" onFinish={handleSaveCompanyInfo}>
                <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                  <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item label="GST / Tax ID" name="gst">
                  <Input />
                </Form.Item>
                <Form.Item label="Contact Info" name="contact" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Company Logo"
                  name="logo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload beforeUpload={() => false} listType="picture">
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Save</Button>{' '}
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </Form.Item>
              </Form>
            ) : (
              <Descriptions column={1}>
                <Descriptions.Item label="Company Name">{companyInfo.name}</Descriptions.Item>
                <Descriptions.Item label="Address">{companyInfo.address}</Descriptions.Item>
                <Descriptions.Item label="GST / Tax ID">{companyInfo.gst}</Descriptions.Item>
                <Descriptions.Item label="Contact Info">{companyInfo.contact}</Descriptions.Item>
                <Descriptions.Item label="Logo">
                  {companyInfo.logo?.[0]?.originFileObj ? (
                    <img
                      src={URL.createObjectURL(companyInfo.logo[0].originFileObj)}
                      alt="Logo"
                      style={{ maxWidth: 120 }}
                    />
                  ) : 'No logo uploaded'}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
        </TabPane>

        <TabPane tab="Users & Roles" key="users">
          <Card
            title="Users & Roles"
            extra={<Button type="primary" onClick={() => showUserModal()}>Add User</Button>}
          >
            <Table columns={userColumns} dataSource={users} rowKey="id" pagination={false} />
          </Card>

          <Modal
            title={currentUser ? 'Edit User' : 'Add User'}
            open={isModalVisible}
            onCancel={closeModal}
            footer={null}
          >
            <Form form={userForm} layout="vertical" onFinish={handleUserSave}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Select placeholder="Select Role">
                  <Option value="Admin">Admin</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="CEO">CEO</Option>
                  <Option value="MD">MD</Option>
                  <Option value="Intern">Intern</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="Categories" key="categories">
          <Card
            title="Manage Categories"
            extra={<Button type="primary" onClick={() => showCategoryModal()}>Add Category</Button>}
          >
            <Table dataSource={categories} columns={categoryColumns} rowKey="id" pagination={false} />
          </Card>

          <Modal
            title={currentCategory ? 'Edit Category' : 'Add Category'}
            open={isCategoryModalVisible}
            onCancel={closeCategoryModal}
            footer={null}
          >
            <Form form={categoryForm} layout="vertical" onFinish={handleCategorySave}>
              <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
  <Card title="Notification Settings">
    <Form
      layout="vertical"
      initialValues={{
        enabled: true,
        email: companyInfo.contact || '',  // default to company contact email if available
        types: ['transaction_added', 'low_balance'],
        frequency: 'instant',
      }}
      onFinish={(values) => {
        message.success('Notification settings saved!');
        // You can save these values in state or send to backend here
        console.log('Notification settings:', values);
      }}
    >
      <Form.Item
        name="enabled"
        label="Enable Notifications"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Notification Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Notification Types"
        name="types"
        rules={[{ required: true, message: 'Select at least one notification type' }]}
      >
        <Select mode="multiple" placeholder="Select notification types">
          <Option value="transaction_added">Transaction Added</Option>
          <Option value="transaction_updated">Transaction Updated</Option>
          <Option value="low_balance">Low Balance Alert</Option>
          <Option value="monthly_report">Monthly Report</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Notification Frequency"
        name="frequency"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="instant">Instant</Option>
          <Option value="daily">Daily Summary</Option>
          <Option value="weekly">Weekly Summary</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Save Notification Settings</Button>
      </Form.Item>
    </Form>
  </Card>
</TabPane>
  </Tabs>
     </div>
     );
     };
export default SettingsPage;
