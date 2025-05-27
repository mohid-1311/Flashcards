import { useState } from "react";
import LoginComp from "../../Components/Login/LoginComp";
import SignupComp from "../../Components/Signup/SignupComp";
import { LoginProps } from "../../types";
import "../../data";

function Login({setShowNav, setIsAuthentificated}: LoginProps){
  
  const [login, setLogin] = useState(true)
  return(
    <>
      {!login && <SignupComp setLogin={setLogin}/>}
      {login && <LoginComp setLogin={setLogin} setShowNav={setShowNav} setIsAuthentificated={setIsAuthentificated}/>}
    </>
  );
}
export default Login