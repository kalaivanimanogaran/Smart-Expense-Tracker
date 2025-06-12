
import React from 'react';
import { Form, Input, DatePicker, Select, Button, Checkbox } from 'antd';

const { Option } = Select;

const AddIncome = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Income Data:', values);
    form.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: '450px',
        margin: '40px auto',
        padding: '25px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '600' }}>
        Add Company Income
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        size="middle"
      >
        <Form.Item
          label="Client Name"
          name="clientName"
          rules={[{ required: true, message: 'Please enter the client name!' }]}
        >
          <Input placeholder="e.g. ABC Corp" />
        </Form.Item>

        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: 'Please enter the project name!' }]}
        >
          <Input placeholder="e.g. Inventory Management System" />
        </Form.Item>

        <Form.Item
          label="Income Type"
          name="incomeType"
          rules={[{ required: true, message: 'Please select income type!' }]}
        >
          <Select placeholder="Select type">
            <Option value="project">Client Project</Option>
            <Option value="product">Software Product Sale</Option>
            <Option value="subscription">SaaS Subscription</Option>
            <Option value="consulting">Consulting/Training</Option>
            <Option value="maintenance">Maintenance/Support</Option>
            <Option value="affiliate">Affiliate/Commission</Option>
            <Option value="interest">Interest/Investment</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Invoice Number"
          name="invoiceNo"
          rules={[{ required: true, message: 'Please enter invoice number!' }]}
        >
          <Input placeholder="e.g. INV-2025-001" />
        </Form.Item>

        <Form.Item
          label="Amount Received"
          name="amount"
          rules={[{ required: true, message: 'Please enter the amount!' }]}
        >
          <Input type="number" placeholder="e.g. 25000" />
        </Form.Item>

        <Form.Item
          label="Payment Date"
          name="date"
          rules={[{ required: true, message: 'Please select the payment date!' }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Payment Mode"
          name="paymentMode"
          rules={[{ required: true, message: 'Please select payment mode!' }]}
        >
          <Select placeholder="Select mode">
            <Option value="bank">Bank Transfer</Option>
            <Option value="upi">UPI</Option>
            <Option value="cheque">Cheque</Option>
            <Option value="cash">Cash</Option>
          </Select>
        </Form.Item>

        <Form.Item name="gstIncluded" valuePropName="checked">
          <Checkbox>GST Included</Checkbox>
        </Form.Item>

        <Form.Item
          label="Description / Notes"
          name="description"
        >
          <Input.TextArea rows={3} placeholder="Optional notes or remarks" />
        </Form.Item>

        <Form.Item style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit" block>
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddIncome;
