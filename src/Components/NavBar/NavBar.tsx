// import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./NavBar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function NavBar() {

  const navigate = useNavigate()
  function handleLogout() {
    localStorage.setItem('isAuthenticated', "false")
    navigate("/Anmeldung")

  }

  const links = [
    { link: "./Startseite", label: "Startseite" },
    { link: "./Hinzufuegen", label: "Hinzufügen" },
    { link: "./Verwaltung", label: "Verwaltung" },
    { link: "./Fortschritt", label: "Fortschritt" },
    { link: "./Importieren", label: "Importieren" },
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
          <Link onClick={handleLogout} className={styles["logout-link"]} to="./Anmeldung">
            <li key={links.length} className={styles["logout-link-text"]}>
              <button
                className={styles["logout-button"]}
                onClick={() => handleLogout}>
                <FontAwesomeIcon className={styles["logout-icon"]} icon={faRightFromBracket} size="lg" />
              </button>
            </li>
          </Link>
        </ul>
      </h3>
    </nav>
  )
}

export default NavBar