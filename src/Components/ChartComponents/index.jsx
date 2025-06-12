
import React from "react";
import { Bar, Pie } from "@ant-design/charts";
import "./style.css";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  let newSpendings = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];

  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpendings[0].amount += item.amount;
    } else if (item.tag === "education") {
      newSpendings[1].amount += item.amount;
    } else {
      newSpendings[2].amount += item.amount;
    }
  });

  const config = {
    data,
    height: 300,
    width:400,
    padding: [50, 20, 60, 40],
    xField: "date",
    yField: "amount",
     isGroup: true,
      color: ['#1890ff', '#73d13d', '#ff4d4f'],
    xAxis: {
      label: {
        style: {
          fontSize: 12,
        },
      },
    },
    yAxis: {
      label: {
        rotate: -45,
        style: {
          fontSize: 12,
        },
      },
    },
    tooltip: {
      showMarkers: true,
    },
    barStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  const spendingConfig = {
    data: newSpendings,
    height: 300,
    width:300,
    angleField: "amount",
     colorField: "tag", 
    label: {
      type: "spider",
      style: {
        fontSize: 14,
      },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <>
 
<div className="chart-wrapper">
      <div className="bar-chart">
        <h2 style={{ marginTop: 0 }}>Financial statistics</h2>
        <Bar {...config} />
      </div>
    </div>
      <div className="chart-wrapper-2">
      
      <div className="pie-chart">
        <h2>Total Spending</h2>
        <Pie {...spendingConfig} />
      </div>
</div>
     </>

  
  );
}

export default ChartComponent;

