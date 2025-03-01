import React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
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
      <ul className={styles["navbar-liste"]}>
        {links.map((link, index) => (
          <li key={index}><Link to={link.link}>{link.label}</Link></li>
        ))}
        <li>
          <button 
           className={styles["logout-button"]}
           onClick={handleLogout}>
            Abmelden
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar