import { useState } from "react";
import styles from "./Anmeldung.module.css"
import { useNavigate } from "react-router-dom";
import { AnmeldungCompProps } from "../../types";
import bcrypt from "bcryptjs";
import { getBenutzer } from "../../daten";

function AnmeldungComp({setAnmeldung, setShowNav, setIsAuthentificated} : AnmeldungCompProps){

  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")
  const navigate = useNavigate()

  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const benutzer = await getBenutzer(username);
    if(!benutzer) {
      alert("Ungültiger Benutzer")
      return;
    }
    
    if(!benutzer.passwort) return;

    const passwortKorrekt = await bcrypt.compare(passwort, benutzer.passwort);
    
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