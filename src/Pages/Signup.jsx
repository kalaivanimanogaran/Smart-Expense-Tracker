import React from 'react'
import Header from "../Components/Header"; 
import SignupSigninComponent from '../Components/SignupSignin';
function Signup() {
  return (
    <div>
      <Header/>
      <div className="Wrapper">
        <SignupSigninComponent/>
      </div>
    </div>
  ) 
}

export default Signup 