import { useState } from "react";
import styles from "./Anmeldung.module.css"
import { useNavigate } from "react-router-dom";
import { User, AnmeldungCompProps } from "../../types";
import bcrypt from "bcryptjs";

function AnmeldungComp({setAnmeldung, setShowNav, setIsAuthentificated} : AnmeldungCompProps){

  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")
  const navigate = useNavigate()

  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("loginData") || "[]"))
    const userArray: User[] = JSON.parse(localStorage.getItem("loginData") || "[]");

    const userExists = userArray.some((user: User) => user.uName === username)

    if(!userExists) {
      alert("Ungültiger Benutzer")
      return;
    }
    
    const benutzerPasswort = userArray.find((user) => user.uName === username)?.pw;
    if(!benutzerPasswort) return;

    const passwortKorrekt = await bcrypt.compare(passwort, benutzerPasswort);

    if (!passwortKorrekt) {
      alert("Ungültiges Passwort")
      return;
    }

    localStorage.setItem("user", username)
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthentificated(true)
    setShowNav(false)
    navigate("/Startseite")
    return
  }
  //userExists ? navigate("/Startseite") : alert("Ungültige Eingabewerte")
  
  return(
    <div className={styles["anmeldung-container"]}>
      <form onSubmit={(e) => login(e)}>
        <div className={styles["anmeldung-display"]}>
          <h1>Anmeldung</h1>
          <div className={styles["anmeldung-username"]}>
            <label htmlFor="nutzername" >Username</label>
            <input 
              type="text" 
              className={styles["nutzername-input"]} 
              name="nutzername" 
              onChange={(e) => setUsername(e.target.value)}
              minLength={4}
              maxLength={16}
              required
            />
          </div>

          <div className={styles["anmeldung-passwort"]}>
            <label htmlFor="passwort">Passwort</label>
            <input 
              type="password" 
              className={styles["nutzername-passwort"]}
              name="passwort" 
              onChange={(e) => setPasswort(e.target.value)}
              minLength={4}
              maxLength={20}
              required
            />
          </div>

          <button type="submit" className={styles["button-submit"]}>
            Anmelden
          </button>
        </div>

        <span onClick={(e) => (setAnmeldung(false))}>Zur Registrierung</span>
      </form>
    </div>
  );
}
export default AnmeldungComp