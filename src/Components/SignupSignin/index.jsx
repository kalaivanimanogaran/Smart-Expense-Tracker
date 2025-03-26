import React,{ useState }from 'react'
import './style.css';
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword ,
        signInWithEmailAndPassword} 
from "firebase/auth";
import {auth, db } from "../../Firebase";
import {doc, getDoc,setDoc }from "firebase/firestore";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function SignupSigninComponent() {
  const[name,setName]= useState ("");
  const[email,setEmail]= useState("");
  const[password,setPassword]= useState("");
  const[confirmPassword,setConfirmPassword]= useState("");
  const[loginForm,setLoginForm]=useState(false);
  const[loading,setLoading] =useState(false);
  const navigate=useNavigate();

function signupwithEmail(){
  setLoading(true);
  console.log("Name",name);
  console.log("email",email);
  console.log("password",password);
  console.log("confirmPassword",confirmPassword);

//   //Authetication the user ,or basically create a new account using email and password
  if(name!=""&& email!=""&& password!=""&& confirmPassword!=""){
    if(password==confirmPassword){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User>>>",user)
    toast.success("User Created!");
    setLoading(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    createDoc(user);
    navigate("/dashboard");
    // create A doc with user id as the following id
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    // ..
  });
}else{
  toast.error("password and confirm password don't Match!");
  setLoading(false);
}
  }else{
   toast.error("All field are mandatory!");
   setLoading(false);
  }
}
function loginUsingEmail(){
  console.log("Email",email);
  console.log("Password",password);
  setLoading(true);
  if( email!=""&& password!="" ){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("user logged In!");
      console.log("user logged In",user);
      setLoading(false);
      navigate("/dashboard");
   

    

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      toast.error(errorMessage);
      

    });

  }
  else{
     toast.error("All fields are mendatory")
     setLoading(false);
  }

}
 async function createDoc(user){
  setLoading(true);
  //make sure that the doc with the uid doesn't exist
  //create a doc
  if(!user) return;

  const userRef =doc(db,"users", user.uid);
  const userData =await getDoc(userRef);
  if(!userData.exists()){

  try{
  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName ? user.displayName :name,
    email : user.email, 
    photoURL :user.photoURL ? user.photoURL : "",
    CreatedAt: new Date(),
  });
  toast.success("Doc Created!");
  setLoading(false);
} catch (e){
  toast.error(e.message); 
  setLoading(false);
}
        
}else{
  //toast.error("Doc already exists"); 
  setLoading(false);

}
 }

function googleAuth(){
  setLoading(true);
  try{
    const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user>>>",user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("User authenticated!");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    setLoading(false);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false); 
  });
  }catch (e) {
    toast.error(e.message);
  }

}

  return (
    <>
    {loginForm ? (
    <div className='signup-wrapper'> 
    <h2 className="title">
       Login on <span style ={{color:"var(--theme)"}}>Expense tracker</span>
    </h2>
    <form>
      
      <Input
      type="email"
      label={"Email"}
      state={email}
      setState={setEmail}
      placeholder={"your name@gmail.com"}
      />
      <Input
      type="password"
      label={"password"}
      state={password}
      setState={setPassword}
      placeholder={"Example@123"}
      />
     
      <Button
      disabled={loading}
       text={loading ? "Loading..." : "Login Using Email and Password"}
       onClick={loginUsingEmail}
       />

      <p style ={{textAlign:"center",margin:0}}>or</p>
      <Button 
      onClick={googleAuth}
      text ={loading ? "Loading..." :" Login Using Google"}
       blue={true}
       />
      <p className="p-login" 
      style={{cursor:"pointer"}}
      onClick={()=>setLoginForm(!loginForm)}>
      
      or Don't Have An Account ?Click Here
      </p>


      </form>
    
    </div>
) : (

    
    <div className='signup-wrapper'> 
    <h2 className="title">
       Sign up on <span style ={{color:"var(--theme)"}}>Expense tracker</span>
    </h2>
    <form>
      <Input
      label={"full Name"}
      state={name}
      setState={setName}
      placeholder={"your name"}
      />
      <Input
      type="email"
      label={"Email"}
      state={email}
      setState={setEmail}
      placeholder={"your name@gmail.com"}
      />
      <Input
      type="password"
      label={"password"}
      state={password}
      setState={setPassword}
      placeholder={"Example@123"}
      />

      <Input
      type="password"
      label={"confirmPassword"}
      state={confirmPassword}
      setState={setConfirmPassword}
      placeholder={"Example@123"}
      />
     
      <Button
      disabled={loading}
       text={loading ? "Loading..." : "Signup Using Email and Password"}
       onClick={ signupwithEmail}/>

      <p className="p-login">or</p>
      <Button 
      onClick={googleAuth}
      text ={loading ? "Loading..." :" Signup Using Google"}
       blue={true}
       />

       <p className="p-login"
        style={{cursor:"pointer"}}
        onClick={()=>setLoginForm(!loginForm)}
       >
        or Have An Account Already ? Click Here
       </p>
      </form>
      
    </div>
)}
    </>
  );
}

export default SignupSigninComponent;
