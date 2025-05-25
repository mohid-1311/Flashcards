import { useState } from "react";
import { getBenutzer, addBenutzer } from "../../daten"
import { User, SetAnmeldung } from "../../types";
import styles from "../Anmeldung/Anmeldung.module.css"
import bcrypt from "bcryptjs";

function RegistrierungComp({setAnmeldung} : SetAnmeldung){

  const [username, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")
  const [passwortWiederholen, setPasswortWiederholen] = useState("")

  async function login(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    const benutzerVorhanden = await getBenutzer(username) ? true : false;
    
    if (passwort !== passwortWiederholen){
      alert("Passwort stimmt nicht überein!")
      setPasswort("")
      setPasswortWiederholen("")
      return
    }

    if (benutzerVorhanden){
      alert("Benutzername bereits vergeben")
      return
    }
    else {
      alert("Erfolgreich registriert")
      setAnmeldung(true)
      const hashedPasswort = await bcrypt.hash(passwort, 10);
      const data: User = {name: username, passwort: hashedPasswort};
      addBenutzer(data);
    }
  }

  return(
    <div className={styles["registrierung-container"]}>
      <form onSubmit={(e) => login(e)} >
        <div className={styles["registrierung-display"]}>
          <h1>Registrierung</h1>
          <div className={styles["registrierung-username"]}>
            <label htmlFor="nutzername">Username</label>
            <input type="text" name="nutzername" className={styles["nutzername-input"]} minLength={4} maxLength={16} required onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className={styles["registrierung-passwort"]}>
            <label htmlFor="passwort">Passwort</label>
            <input type="password" name="passwort" value={passwort} className={styles["passwort-input"]} minLength={4} maxLength={20} required onChange={(e) => setPasswort(e.target.value)}/>
          </div>
          <div className={styles["registrierung-passwort"]}>
            <label htmlFor="passwort-wiederholen">Passwort wiederholen</label>
            <input type="password" name="passwort-wiederholen" value={passwortWiederholen} className={styles["passwort-input"]} minLength={4} maxLength={20} required onChange={(e) => setPasswortWiederholen(e.target.value)}/>
          </div>
          <button type="submit" className={styles["button-submit"]}>Registrieren</button>
        </div>
        <span onClick={(e) => (setAnmeldung(true))}>Zur Anmeldung</span>
      </form>
    </div>
  );

}
export default RegistrierungComp