import { useState } from "react";
import { setData } from "../../data"
import styles from "./Anmeldung.module.css"
function RegistrierungComp(){

  interface User {
    uName: string;
    pw: string;
  }

  const userArray: User[] = JSON.parse(localStorage.getItem("loginData") || "[]");
  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")

  function login(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("loginData") || "[]"))

    const userArray: User[] = JSON.parse(localStorage.getItem("loginData") || "[]");

    const userExists = userArray.some((user: User)=> user.uName.toLowerCase() === username.toLowerCase())
    if (userExists){
      alert("Benutzername bereits vergeben")
      return
    }
    else {
      alert("Erfolgreich registriert")
      const data = {uName: username, pw: passwort};
      userArray.push(data);
      localStorage.setItem("loginData", JSON.stringify(userArray))
    }

  }
  return(
    
    <div className="registrireung-container">
      <h1>Registrierung</h1>
      <div className="registrierung-display">
        <form onSubmit={(e) => login(e)}>
          <div className="registrierung-username">
            <label htmlFor="nutzername">Username</label>
            <input type="text" name="nutzername" required onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="registrierung-passwort">
            <label htmlFor="passwort">Passwort</label>
            <input type="text" name="passwort" required onChange={(e) => setPasswort(e.target.value)}/>
          <button type="submit">Registrieren</button>
          </div>
        </form>
      </div>
    </div>
  );

}
export default RegistrierungComp