import React, { useState,useEffect} from "react";
import Header from '../Components/Header';
import Cards from '../Components/Cards';
import AddExpenseModal from "../Components/Modals/addExpense";
import AddIncomeModal from "../Components/Modals/addIncome";
import { query,addDoc, collection, getDocs} from "firebase/firestore"
import { auth, db} from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
//import React, { useState, useEffect } from "react";
import moment from "moment";
import TransactionsTable from "../Components/TransactionsTable";
 

function Dashboard() {
  // const transactions=[{
  //    type:"income",
  //    amount:1200,
  //    tag:"salary",
  //    name:"income 1",
  //    date:"2025-05-23",
  // },
  // {

  //   type:"expense",
  //   amount:800,
  //   tag:"food",
  //   name:"expense 1",
  //   date:"2025-05-17",
  // },];
  const [transactions,setTransactions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible ,setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible ,setIsIncomeModalVisible] = useState(false);
  const[income,setIncome]=useState(0);
  const[expense,setExpense]=useState(0);
  const[totalBalance,setTotalBalance]=useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

 const onFinish = (values,type)=>{
  const newTransaction={
    type:type,
    date:moment(values.date).format("YYYY-MM-DD"),
    amount:parseFloat(values.amount),
    tag:values.tag,
    name:values.name,
  };
  addTransaction(newTransaction);
 };

 async function addTransaction(transaction,many){
  try{
    const docRef = await addDoc(
      collection(db,`user/${user.uid}/transactions`),
      transaction
    )
    console.log("Document written with ID:" ,docRef.id);
    if(!many)toast.success("Transaction Added!");
    newArr = transaction;
    newArr.push(transaction);
    (newArr);
    calculateBalance();
    fetchTransaction();

  } catch(e){
    console.error( "Error adding document: ",e);
    if(!many)toast.error("couldn't add transaction");
    }
  }
 
useEffect(()=>{
  //get all docs from a collection
  fetchTransaction();
},[user]);

useEffect(()=>{
  calculateBalance();
},[transactions]);

const calculateBalance = () =>{
  let incomeTotal = 0;
  let expensesTotal = 0;
   

  transactions.forEach((transaction) =>{
    if(transaction.type ==="income"){
      incomeTotal += transaction.amount;
    }else{
      expensesTotal += transaction.amount;

    }

  });

  setIncome(incomeTotal);
  setExpense(expensesTotal);
  setTotalBalance(incomeTotal - expensesTotal);
};

async function fetchTransaction(){
  setLoading(true);
  if(user){
    const q=query(collection(db,`user/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray =[];
    querySnapshot.forEach((doc)=>{
      //doc.data() is never undefined for query  doc snapshots
      transactionsArray.push(doc.data());
    });
    setTransactions(transactionsArray);
   // console.log("Transactions Array",transactionsArray);
    toast.success("Transaction fetched!");
  }  
  setLoading(false);
}


  return (
    <div>
    <Header/>
    {loading ? (
    <p>Loading...</p>

    ):(
      <>

    <Cards 
    income={income}
    expense={expense}
    totalBalance={totalBalance}
      showExpenseModal = {showExpenseModal}
      showIncomeModal = {showIncomeModal}
    />
    <AddExpenseModal
    isExpenseModalVisible={isExpenseModalVisible}
    handleExpenseCancel={handleExpenseCancel}
    onFinish={onFinish}
    />
    <AddIncomeModal
    isIncomeModalVisible={isIncomeModalVisible}
    handleIncomeCancel={handleIncomeCancel}
    onFinish={onFinish}

    />
    <TransactionsTable 
    transactions={transactions}
    addTransation={addTransaction}
    fetchTransactions={fetchTransactions}/>


    </>)}
    
  </div>
  );
}

export default Dashboard;
