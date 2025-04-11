
import React, { useState, useEffect } from "react";
import Header from '../Components/Header';
import Cards from '../Components/Cards';
import AddExpenseModal from "../Components/Modals/addExpense";
import AddIncomeModal from "../Components/Modals/addIncome";
import { query, addDoc, collection, getDocs,updateDoc,deleteDoc, doc, } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import moment from "moment";
import TransactionsTable from "../Components/TransactionsTable";
import NoTransactions from "../Components/NoTransaction";
import ChartComponent from "../Components/ChartComponents";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState(null);

 

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

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);
      if (!many) toast.success("Transaction Added!");
      fetchTransaction();
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }
  

  const onFinish = async (values, type) => {
    const transaction = {
      type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
  
    if (editMode && editTransactionData) {
      try {
        const docRef = doc(db, `user/${user.uid}/transactions/${editTransactionData.id}`);
        await updateDoc(docRef, transaction);
        toast.success("Transaction updated!");
        setEditMode(false);
        setEditTransactionData(null);
        fetchTransaction();
      } catch (err) {
        toast.error("Failed to update transaction");
        console.error(err);
      }
    } else {
      addTransaction(transaction);
    }
  };


  async function deleteTransaction(transactionId) {
    try {
      await deleteDoc(doc(db, `user/${user.uid}/transactions/${transactionId}`));
      toast.success("Transaction deleted!");
      fetchTransaction();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete transaction.");
    }
  }
  
  
  
  useEffect(() => {
    fetchTransaction();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransaction() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `user/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(transactionsArray);
      toast.success("Transaction fetched!");
    }
    setLoading(false);
  }

  let sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions && transactions.length !== 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
            editMode={editMode}
            editTransactionData={editTransactionData}
          />
          

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
            editMode={editMode}
            editTransactionData={editTransactionData}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransaction}
            setEditMode={setEditMode}
            setEditTransactionData={setEditTransactionData}
            deleteTransaction={deleteTransaction}
            setIsIncomeModalVisible={setIsIncomeModalVisible} 
            setIsExpenseModalVisible={setIsExpenseModalVisible}
           
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;


