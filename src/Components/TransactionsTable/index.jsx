import React, { useState } from 'react'
import { Radio, Select,Table } from 'antd'; 
import searchImg from "../../assets/search.png";
import { parse, unparse } from 'papaparse';
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
  
    function exportCSV(){
      var csv =unparse ({
        fields:["name","type","tag","date","amount"],
        data:transactions,
      });

      const blob =new Blob([csv],{type:"text/csv;charset=Utf-8"});
      const url =URL.createObjectURL(blob);
      const link =document.createElement("a");
      link.href=url;
      link.download = "transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);  

    }
   

    function importFromCSV(event) {
      event.preventDefault();
      try {
        parse(event.target.files[0], {
          header: true,
          complete: async function (results) {
            let successCount = 0;
            let failCount = 0;
    
            for (const transaction of results.data) {
              const name = transaction.name?.trim();
              const tag = transaction.tag?.trim() || "";
              const type = transaction.type?.trim();
              const date = transaction.date?.trim();
              const amount = parseFloat(transaction.amount);
    
              if (name && !isNaN(amount) && type && date) {
                const NewTransaction = {
                  name,
                  tag,
                  type,
                  date,
                  amount,
                };
                await addTransaction(NewTransaction, true);
                successCount++;
              } else {
                console.warn("Skipped invalid transaction:", transaction);
                failCount++;
              }
            }
    
            toast.success(`${successCount} transactions added successfully.`);
            if (failCount > 0) {
              toast.warn(`${failCount} transactions were skipped due to invalid data.`);
            }
    
            fetchTransactions();
            event.target.value = null;
          },
        });
      } catch (e) {
        toast.error("Failed to import csv file");
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
    <button className="btn" onClick={exportCSV}>
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
   <Table
    dataSource={sortedTransactions} 
    columns={columns}  
     rowKey="id"
   />
   </div>
   </div>
  );
}

export default TransactionsTable;
