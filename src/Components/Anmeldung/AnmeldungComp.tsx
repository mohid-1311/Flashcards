import { useState } from "react";
import styles from "./Anmeldung.module.css"
function AnmeldungComp(){

  const [usernmae, setUsername] = useState("")
  const [passwort, setPasswort] = useState("")

  function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
  }
  return(
    <div className="anmeldung-container">
      <div className="anmeldung-display">
        <form onSubmit={(e) => login(e)}>
          <button type="submit">Registrieren</button>

          <div className="anmeldung-username">
            <label htmlFor="nutzername">Username</label>
            <input type="text" name="" />
          </div>
          <div className="anmeldung-passwort">
            <label htmlFor="passwort">Passwort</label>
            <input type="text" name="passwort" />
          </div>

        </form>

      </div>
    </div>
  );

}
export default AnmeldungComp