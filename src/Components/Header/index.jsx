  
import React, { useEffect } from "react"; 
import "./style.css";
import {auth} from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

function Header() {
  const[user, loading]=useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    }
  },[loading]);

  function logoutFnc(){
    try{
    signOut(auth)
    .then(()=>{
      toast.success("Logged Out Successfully!");
      navigate("/");
    })
  .catch((error)=>{
    toast.error(error.message);
  });
}catch(e){
  toast.error(e.message);

}
    alert("Logout!");
  }

  return(
   <div className="navbar">
    <p className="logo">Expense Tracker</p>
    {user &&(
     <p className="logo link" onClick={logoutFnc}>
      Logout
      </p>
    )}
  
   
    </div>
  );
};

export default Header;

 