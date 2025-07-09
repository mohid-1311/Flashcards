import { useState } from "react";
import { getUser, addUser } from "../../data"
import { User, SetLogin } from "../../types";
import styles from "../Login/Login.module.css"
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

function SignupComp({setLogin} : SetLogin){

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")

  async function login(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    
    setUsername(username.toLowerCase())

    const userExists = await getUser(username) ? true : false;
    
    if (password !== passwordRepeat){
      toast.error("Passwort stimmt nicht überein!");
      setPassword("")
      setPasswordRepeat("")
      return
    }

    if (userExists){
      toast.error("Benutzername bereits vergeben");
      return
    }
    else {
      toast.success("Erfolgreich registriert!");
      setLogin(true)
      const hashedPassword = await bcrypt.hash(password, 10);
      const data: User = {name: username, password: hashedPassword};
      addUser(data);
    }
  }

  return(
    <div className={styles["signup-container"]}>
      <form onSubmit={(e) => login(e)} >
        <div className={styles["signup-display"]}>
          <h1>Registrierung</h1>
          <div className={styles["signup-username"]}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className={styles["username-input"]} minLength={4} maxLength={16} required onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className={styles["signup-password"]}>
            <label htmlFor="password">Passwort</label>
            <input type="password" name="password" value={password} className={styles["password-input"]} minLength={4} maxLength={20} required onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className={styles["signup-password"]}>
            <label htmlFor="password-repeat">Passwort wiederholen</label>
            <input type="password" name="password-repeat" value={passwordRepeat} className={styles["password-input"]} minLength={4} maxLength={20} required onChange={(e) => setPasswordRepeat(e.target.value)}/>
          </div>
          <button type="submit" className={styles["button-submit"]}>Registrieren</button>
        </div>
        <span onClick={(e) => (setLogin(true))}>Zur Anmeldung</span>
      </form>
    </div>
  );

}
export default SignupComp