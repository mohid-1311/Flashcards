import { useState } from "react";
import { setData } from "../../data"
import { SetAnmeldung } from "../../types";
import styles from "../Anmeldung/Anmeldung.module.css"

interface User {
  uName: string;
  pw: string;
}

function RegistrierungComp({setAnmeldung} : SetAnmeldung){

  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")

  function login(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const userArray: User[] = JSON.parse(localStorage.getItem("loginData") || "[]");

    const userExists = userArray.some((user: User) => user.uName.toLowerCase() === username.toLowerCase())
    if (userExists){
      alert("Benutzername bereits vergeben")
      return
    }
    else {
      alert("Erfolgreich registriert")
      setAnmeldung(true)
      const data = {uName: username, pw: passwort}
      userArray.push(data)
      setData(userArray)
    }
  }

  return(
    
    <div className={styles["registrierung-container"]}>
      <form onSubmit={(e) => login(e)} >
        <div className={styles["registrierung-display"]}>
          <h1>Registrierung</h1>
          <div className={styles["registrierung-username"]}>
            <label htmlFor="nutzername">Username</label>
            <input type="text" name="nutzername" className={styles["nutzername-input"]} required onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className={styles["registrierung-passwort"]}>
            <label htmlFor="passwort">Passwort</label>
            <input type="text" name="passwort" className={styles["passwort-input"]}required onChange={(e) => setPasswort(e.target.value)}/>
          </div>
          <button type="submit" className={styles["button-submit"]}>Registrieren</button>
        </div>
        <span onClick={(e) => (setAnmeldung(true))}>Zur Anmeldung</span>
      </form>
    </div>
  );

}
export default RegistrierungComp