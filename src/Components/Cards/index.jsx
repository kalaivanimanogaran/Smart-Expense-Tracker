
 import React from 'react';


import "./style.css";

 import { Card, Row,Table, Button as AntButton } from "antd"; 
import Button from "../Button"; 
import {
  DollarCircleOutlined,
  CreditCardOutlined,
  BankOutlined
} from '@ant-design/icons';



// Example dummy data (replace this with actual data from Firebase or state)
const dummyTransactions = [
  { id: 1, type: "Income", category: "Salary", amount: 10000, date: "2025-04-25" },
  { id: 2, type: "Expense", category: "Groceries", amount: 1200, date: "2025-04-24" },
  { id: 3, type: "Expense", category: "Recharge", amount: 299, date: "2025-04-23" },
  { id: 4, type: "Income", category: "Freelance", amount: 3000, date: "2025-04-22" },
  { id: 5, type: "Expense", category: "Snacks", amount: 150, date: "2025-04-21" },
  { id: 6, type: "Income", category: "Gift", amount: 500, date: "2025-04-20" },
];



function Cards({
  income,
  expense,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
}) {

  // Slice the latest 5 transactions from the dummy data
  const recentTransactions = dummyTransactions.slice(0, 5);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '5%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <span className={record.type === "Income" ? "text-green-600" : "text-red-600"}>
          ₹{text}
        </span>
      ),
      width: '5%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '5%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <span style={{ color: text === "Income" ? "green" : "red" }}>
          {text}
        </span>
      ),
      width: '5%',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1px' }}> 
          <AntButton type="primary" onClick={() => handleEdit(record.id)} style={{ marginRight: 8}}>
            Edit
          </AntButton>
          <AntButton
        style={{ backgroundColor: '#007bff', color: 'white' }}
        onClick={() => handleDelete(record.id)}
      >
        Delete
      </AntButton>
        </div>
      ),
      width:'1%',
    },
  ];

  // edit button handler
  const handleEdit = (id) => {
    console.log("Edit transaction with ID:", id);
   
  };

  // Delete button handler
  const handleDelete = (id) => {
    console.log("Delete transaction with ID:", id);
   
  };

  return (
    <div>
      <Row className="my-row">
        <Card className="my-card-1">
        <div className="icon-top">
        <BankOutlined style={{ fontSize: '30px', color: '#6366f1' }} />
        </div>
          <h2 style={{ color: "#708090" }}>Current Balance</h2>
          <p style={{ color: "black", fontWeight: 500, fontSize: "25px" }}>₹{totalBalance}</p>
        </Card>
      

        <Card className="my-card-2">
        <div className="icon-top">
        <DollarCircleOutlined style={{ fontSize: '30px', color: '#16a34a' }} />
        </div>
          <h2 style={{ color: "#708090" }}>Total Income</h2>
          <p style={{ color: "green", fontWeight: 500, fontSize: "25px" }}>₹{income}</p>
        </Card>

        <Card className="my-card-3">
        <div className="icon-top">
         <CreditCardOutlined style={{ fontSize: '30px', color: '#dc2626' }} />
         </div>
          <h2 style={{ color: "#708090" }}>Total Expenses</h2>
          <p style={{ color: "red", fontWeight: 500, fontSize: "25px" }}>₹{expense}</p>
        </Card>
      </Row>

      {/*  Display Recent Transactions in a Table */  }
      <div className="mt-8">
        <h2 className= "text-xl font-semibold mb-4">Recent Transactions</h2>
        <div
  className="bg-white shadow-md rounded-lg p-4">
 


      <Table
          columns={columns}
          dataSource={recentTransactions} 
         rowKey="id"  
          pagination={false} 
           style={{ width: '100%', overflowX: 'hidden' }} 
        />  
      </div>
       </div>
    </div> 
  );
}

export default Cards;
