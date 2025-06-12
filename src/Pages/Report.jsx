import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);


 function CategoryReport({ transactionsTable }) {

  const dataMap = {};

  transactionsTable.forEach(({ tag, amount }) => {
    const key = tag || "Uncategorized";
    if (!dataMap[key]) dataMap[key] = 0;
    dataMap[key] += amount;
  });

  const labels = Object.keys(dataMap);
  const dataValues = Object.values(dataMap);

  const data = {
    labels,
    datasets: [
      {
        label: "Category-wise Amount",
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 30,
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Category-wise Expense Report</h2>
      <Pie data={data} />
    </div>
  );
}

export default CategoryReport;
