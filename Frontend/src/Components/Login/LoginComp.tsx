import { useState } from "react";
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";
import { LoginCompProps } from "../../types";
import bcrypt from "bcryptjs";
import { getUser } from "../../data";

function LoginComp({setLogin, setShowNav, setIsAuthentificated} : LoginCompProps){

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function login(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const user = await getUser(username.toLowerCase());
    if(!user) {
      alert("Ungültiger Benutzer") //#TODO replace
      return;
    }
    
    if(!user.password) return;

    const passwordCorrect = await bcrypt.compare(password, user.password);
    
    if (!passwordCorrect) {
      alert("Ungültiges password") //#TODO replace
      return;
    }

    localStorage.setItem("user", user.name)
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthentificated(true)
    setShowNav(false)
    navigate("/Startseite")
    return
  }
  
  return(
    <div className={styles["login-container"]}>
      <form onSubmit={(e) => login(e)}>
        <div className={styles["login-display"]}>
          <h1>Anmeldung</h1>
          <div className={styles["login-username"]}>
            <label htmlFor="username" >Benutzername</label>
            <input 
              type="text" 
              className={styles["username-input"]} 
              name="username" 
              onChange={(e) => setUsername(e.target.value)}
              minLength={4}
              maxLength={16}
              required
            />
          </div>

          <div className={styles["login-password"]}>
            <label htmlFor="password">password</label>
            <input 
              type="password" 
              className={styles["username-password"]}
              name="password" 
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              maxLength={20}
              required
            />
          </div>

          <button type="submit" className={styles["button-submit"]}>
            Anmelden
          </button>
        </div>

        <span onClick={(e) => (setLogin(false))}>Zur Registrierung</span>
      </form>
    </div>
  );
}
export default LoginComp