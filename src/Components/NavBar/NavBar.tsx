import React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import styles from "./NavBar.module.css"
import styles from "./NavBar.module.css"

function NavBar() {

  const navigate = useNavigate()
  function handleLogout(){
    localStorage.setItem('isAuthenticated', "false")
    navigate("/Anmeldung")
  }

  const links = [
    {link: "./Startseite", label: "Startseite"},
    {link: "./Hinzufuegen", label: "Hinzufügen"},
    {link: "./Verwaltung", label: "Verwaltung"},
    {link: "./Fortschritt", label: "Fortschritt"},
    {link: "./Importieren", label: "Importieren"},
  ]

  return (
    <nav>
      <h3>
        <ul className={styles["link-liste"]}>
          {links.map((link, index) => (
            <Link className={styles["link"]} to={link.link}>
              <li key={index} className={styles["link-text"]}>
                {link.label}
              </li>
            </Link>
          ))}
          <li>
          <button 
           className={styles["logout-button"]}
           onClick={handleLogout}>
            Abmelden
          </button>
        </li>
      </ul>
      </h3>
    </nav>
  )
}

export default NavBar