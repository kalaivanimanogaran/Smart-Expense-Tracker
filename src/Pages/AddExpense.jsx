
import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';

const { Option } = Select;

const AddExpense = () => {
  const [form] = Form.useForm();
  const expenseType = Form.useWatch('expenseType', form); 

  const handleSubmit = (values) => {
    console.log('Expense Data:', values);
    form.resetFields();
  };

  return (
    <div style={{
         maxWidth: '450px',
        margin: '40px auto',
        padding: '25px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Company Expense</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Expense Type"
          name="expenseType"
          rules={[{ required: true, message: 'Please select expense type!' }]}
        >
          <Select placeholder="Select expense type">
            <Option value="salary">Salaries</Option>
            <Option value="software">Software Subscriptions</Option>
            <Option value="rent">Office Rent</Option>
            <Option value="utilities">Utilities</Option>
            <Option value="equipment">Office Equipment</Option>
            <Option value="travel">Business Travel</Option>
            <Option value="marketing">Marketing / Ads</Option>
            <Option value="misc">Miscellaneous</Option>
          </Select>
        </Form.Item>

        {/* Show only when "Salaries" is selected */}
        {expenseType === 'salary' && (
          <>
            <Form.Item
              label="Employee Name"
              name="employeeName"
              rules={[{ required: true, message: 'Please enter employee name!' }]}
            >
              <Input placeholder="e.g. John Doe" />
            </Form.Item>

            <Form.Item
              label="Employee ID"
              name="employeeId"
              rules={[{ required: true, message: 'Please enter employee ID!' }]}
            >
              <Input placeholder="e.g. EMP1234" />
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: 'Please enter department!' }]}
            >
              <Input placeholder="e.g. Development, HR" />
            </Form.Item>
          </>
        )}

        {/* Show only if NOT "Salaries" */}
        {expenseType !== 'salary' && (
          <>
            <Form.Item
              label="Vendor / Payee Name"
              name="vendorName"
              rules={[{ required: true, message: 'Please enter the vendor or payee name!' }]}
            >
              <Input placeholder="e.g. XYZ Services" />
            </Form.Item>

            <Form.Item
              label="Invoice Number"
              name="invoiceNo"
              rules={[{ required: true, message: 'Please enter invoice number!' }]}
            >
              <Input placeholder="e.g. EXP-2025-015" />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Amount Paid"
          name="amount"
          rules={[{ required: true, message: 'Please enter the amount!' }]}
        >
          <Input type="number" placeholder="e.g. 12000" />
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

        <Form.Item
          label="Description / Notes"
          name="description"
        >
          <Input.TextArea rows={3} placeholder="Optional notes or remarks" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpense;
