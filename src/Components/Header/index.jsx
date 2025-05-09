import React, { useEffect } from "react"; 
import "./style.css";
import {auth} from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "../../assets/user.png";
import Logo from "../../assets/logo.png";
import { LogoutOutlined } from "@ant-design/icons";



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
      <div className="logo-container">
    <img src={Logo} alt="logo" style={{ height: "2rem", width: "3rem" }} />
      <p className="logo">Expense Tracker</p>
      </div>
    {user &&(
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>      
     <p className="logo-link" onClick={logoutFnc}
     style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          
            <LogoutOutlined />
      Logout
      </p>
      </div>
    )}
  

    </div>
  
  );
};

export default Header;

 