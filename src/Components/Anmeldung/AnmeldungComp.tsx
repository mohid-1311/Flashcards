import { useState } from "react";
import styles from "./Anmeldung.module.css"
import { useNavigate } from "react-router-dom";

interface User {
  uName: string
  pw: string
}

interface Props {
  setAnmeldung: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function AnmeldungComp({setAnmeldung, setShowNav} : Props){

  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")
  const navigate = useNavigate()

  function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("loginData") || "[]"))
    const userArray: User[] = JSON.parse(localStorage.getItem("loginData") || "[]");

    const userExists = userArray.some((user: User) => user.uName === username && user.pw === passwort)

    if(userExists){
      navigate("/Startseite")
      setShowNav(false)
      return
    }
    alert("Ungültige Eingabewerte")
    //userExists ? navigate("/Startseite") : alert("Ungültige Eingabewerte")
  }
  return(
    <div className={styles["anmeldung-container"]}>
      <form onSubmit={(e) => login(e)}>
        <div className={styles["anmeldung-display"]}>
          <h1>Anmeldung</h1>
          <div className={styles["anmeldung-username"]}>
            <label htmlFor="nutzername" >Username</label>
            <input type="text" className={styles["nutzername-input"]} name="" onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className={styles["anmeldung-passwort"]}>
            <label htmlFor="passwort">Passwort</label>
            <input type="text" className={styles["nutzername-passwort"]}name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
          </div>
          <button type="submit" className={styles["button-submit"]}>Anmelden</button>
        </div>
        <span onClick={(e) => (setAnmeldung(false))}>Zur Registrierung</span>
      </form>
    </div>
  );
}
export default AnmeldungComp