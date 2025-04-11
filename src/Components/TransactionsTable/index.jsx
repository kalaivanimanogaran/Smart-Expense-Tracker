import React, { useState } from 'react'
import { Radio, Select,Table } from 'antd'; 
import searchImg from "../../assets/search.png";
import { parse, } from 'papaparse';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TransactionsTable({transactions, addTransaction,fetchTransactions,setEditMode,
  setEditTransactionData,  deleteTransaction,setIsIncomeModalVisible,
  setIsExpenseModalVisible,}) {
    const {Option} =Select;
    const [search,setSearch] =useState("");
    const [typeFilter, setTypeFilter]=useState("");
    const [sortKey, setSortKey]=useState("");
    

   
    const columns=[
        {
            title:"Name",
            dataIndex:"name",
            key:"name",
        },

        {
            title:"Amount",
            dataIndex:"amount",
            key:"amount",
        },

        {
            title:"Tag",
            dataIndex:"tag",
            key:"tag",
        },

        {
            title:"Type",
            dataIndex:"type",
            key:"type",
        },

        {
            title:"Date",
            dataIndex:"date",
            key:"date",
        },
        {
          title: "Actions",
          key: "actions",
          render: (text, record) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-blue" onClick={() => onEdit(record)}>Edit</button>
              <button className="btn btn-red" onClick={() => onDelete(record)}>Delete</button>
            </div>
          ),
        }
        

    ];


    let filteredTransactions = transactions.filter(
    (item)=>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    item.type.includes(typeFilter)
);
    let sortedTransactions = filteredTransactions.sort((a,b)=>{
        if(sortKey ==="date"){
            return new Date(a.date)-new Date(b.date);
        } else if(sortKey==="amount"){
            return a.amount -b.amount;
        }else{
            return 0;
        }
    });
  
   
   
    
    async function handleExport() {
      try {
        // 🔹 Send data to Google Sheet
        const response = await fetch("https://script.google.com/macros/s/AKfycbzuAMbpuxe5aX8Aj_SNjWzMilCZAMv8IUXG3C2I0ZBiO_j70zP9YYgJ5mr9Qk2Skjll/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sortedTransactions),
        });
    
        const result = await response.text();
    
        if (result.toLowerCase().includes("success")) {
          toast.success("Exported to Google Sheet Successfully");
    
      
          exportCSVLocally();
    
          
          setTimeout(() => {
            window.open("https://docs.google.com/spreadsheets/d/11_Fq8yM4lx5mgKG-qlXzpmveUPz-c9g1_IX7eg19h8k/edit", "_blank");

          }, 1000); 
        } else {
          toast.error("Something went wrong. Try again!");
        }
      } catch (error) {
        console.error("Export Error:", error);
        toast.error("Export failed. Please try again.");
      }
    }
   

    
    

    function exportCSVLocally() {
      const headers = ["Name", "Amount", "Tag", "Type", "Date"];
      const csvRows = [
        headers.join(","),
        ...sortedTransactions.map(tx =>
          [tx.name, tx.amount, tx.tag, tx.type, tx.date].join(",")
        ),
      ];
      const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = window.URL.createObjectURL(csvData);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "transactions.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    
    function importFromCSV(event) {
      event.preventDefault();
      try {
        parse(event.target.files[0], {
          header: true,
          complete: async function (results) {
            try {
              for (const transaction of results.data) {
                if (!transaction.name || !transaction.amount) continue
                const NewTransaction = {
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(NewTransaction, true);
              }              
              toast.success("All Transactions Added");
              fetchTransactions();
            } catch (innerError) {
              toast.error("Some transactions failed to import.");
              console.error(innerError);
            }
          },
        });
      } catch (e) {
        toast.error(e.message);
      }
    }

    const onEdit = (record) => {
      setEditMode(true);
      setEditTransactionData(record);
    
      if (record.type === "income") {
        setIsIncomeModalVisible(true); 
      } else {
        setIsExpenseModalVisible(true); 
      }
    };
    
    
    const onDelete = (record) => {
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        deleteTransaction(record.id);
      }
    };


  return(
  <div
  style={{
    width:"100%",
    padding:"0rem 2rem",
  }}
  >
    <div
    style={{
        display:"flex",
        justifyContent:"space-between",
        gap:"1rem",
        alignItems:"center",
        marginBottom:"1rem",
    }}
    >
  <div className="input-flex">
    <img src={searchImg} width="16"/>
    <input
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    placeholder="Search by name"
    />
    </div>
  
  <Select
  className="Select-input"
  onChange={(value) => setTypeFilter(value)}
  value={typeFilter}
  placeholder="Filter"
  allowClear
  >
    <Option value="">All</Option>
    <Option value="income">Income</Option>
    <Option value="expense">Expense</Option>
  </Select>
  </div>
  <div className="my-table">
    <div
    style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginBottom:"1rem"
    }}
    >
        <h2>My Transactions</h2>

  <Radio.Group
  className="input-radio"
  onChange={(e)=>setSortKey(e.target.value)}
  value={sortKey}
   >
<Radio.Button value="">No Sort</Radio.Button>
<Radio.Button value="date">sort by Date</Radio.Button>
<Radio.Button value="amount">sort by Amount</Radio.Button>

  </Radio.Group>
  <div
    style={{
        display:"flex",
        justifyContent:"center",
        gap:"1rem",
        width:"400px",
    }}
  >
    <button className="btn" onClick={handleExport}>
      Export to CSV</button>
    <label htmlFor="file-csv" className="btn btn-blue">
        Import From CSV
    </label>
    <input
      id="file-csv"
      type="file"
      accept=".csv"
      required
      onChange={importFromCSV}
      style={{display:"none"}}
    />
   


  </div>
  </div>
   <Table dataSource={sortedTransactions} columns={columns}/>
   </div>
   </div>
  );
}

export default TransactionsTable;
