import React, {useState} from 'react'
import "./style.css"
import {Card, Row} from "antd";
import Button from "../Button"

 function Cards({
   income,
   expense,
   totalBalance,
   showExpenseModal,
   showIncomeModal 
  }) {
  //const [count, setCount] = useState(0);  
    return(
        <div>
            <Row className="my-row">
                <Card  className="my-card" >
                  <h2>Current Balance</h2>
                  <p>₹{totalBalance}</p> 
                  <Button text ="Reset Balance" blue={true}/>
                </Card>

                <Card className="my-card" >
                  <h2>Total Income</h2>
                  <p>₹{income}</p> 
                  <Button text ="Add Income" blue={true} onClick={showIncomeModal}/>
                </Card>


                <Card  className="my-card" >
                  <h2>Total Expenses</h2>
                  <p>₹{expense}</p> 
                  <Button text ="Add Expense"blue={true} onClick={showExpenseModal}/>
                </Card>

               
            </Row>

        </div>
    )
 }
 export default Cards
