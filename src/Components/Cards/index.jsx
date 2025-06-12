



import React from 'react';
import "./style.css";
import { Card, Row, Table } from "antd";
import {
  DollarCircleOutlined,
  CreditCardOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Cards = ({ income, expense, totalBalance }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <span style={{ color: record.type === 'income' ? 'green' : 'red' }}>
          ₹{text}
        </span>
      )
    }
  ];

  const data = [
    {
      key: '1',
      date: '2025-06-10',
      type: 'income',
      category: 'Salary',
      amount: 20000
    },
    {
      key: '2',
      date: '2025-06-09',
      type: 'expense',
      category: 'Groceries',
      amount: 3000
    },
    {
      key: '3',
      date: '2025-06-08',
      type: 'income',
      category: 'Freelance',
      amount: 8000
    },
    {
      key: '4',
      date: '2025-06-07',
      type: 'expense',
      category: 'Electricity',
      amount: 2500
    },
    {
      key: '5',
      date: '2025-06-06',
      type: 'expense',
      category: 'Internet',
      amount: 1000
    }
  ];

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#16a34a', '#dc2626'],
        borderColor: ['#e4e4e7', '#e4e4e7'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} className="my-row" style={{ marginBottom: '20px' }}>
        <Card className="my-card my-card-1">
          <div className="icon-top">
            <BankOutlined style={{ fontSize: '30px', color: '#6366f1' }} />
            <h2 style={{ color: "#708090" }}>Current Balance</h2>
          </div>
          <p className="amount-text" style={{ fontSize: "25px" }}>₹{totalBalance}</p>
        </Card>

        <Card className="my-card my-card-2">
          <div className="icon-top">
            <DollarCircleOutlined style={{ fontSize: '30px', color: '#16a34a' }} />
            <h2 style={{ color: "#708090" }}>Total Income</h2>
          </div>
          <p className="amount-text" style={{ color: "green", fontSize: "25px" }}>₹{income}</p>
        </Card>

        <Card className="my-card my-card-3">
          <div className="icon-top">
            <CreditCardOutlined style={{ fontSize: '30px', color: '#dc2626' }} />
            <h2 style={{ color: "#708090" }}>Total Expenses</h2>
          </div>
          <p className="amount-text" style={{ color: "red", fontSize: "25px" }}>₹{expense}</p>
        </Card>
      </Row>

      <h3 style={{ marginBottom: '10px' }}>Recent Transactions</h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="middle"
      />

      <div style={{ maxWidth: '300px', margin: '40px auto' }}>
        <h3 style={{ textAlign: 'center' }}>Income vs Expenses</h3>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default Cards;




