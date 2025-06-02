// import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import styles from "./NavBar.module.css"
import { tl } from "../../translation";
import { useState } from "react";


function NavBar() {
  const location = useLocation();
  const navigate = useNavigate()
  const [showSelect, setShowSelect] = useState(false)
  function handleLogout() {
    localStorage.setItem('isAuthenticated', "false")
    navigate("/Anmeldung")
  }

  const links = [
    { link: "./Startseite", label: tl("page_homepage") },
    { link: "./Hinzufuegen", label: tl("page_add") },
    { link: "./Verwaltung", label: tl("page_management") },
    { link: "./Importieren", label: tl("page_import") },
  ]

  return (
    <nav>
      <ul className={styles["link-liste"]}>
        {links.map((link, index) => (
          <Link 
            className={`${styles["link"]} ${((`.${location.pathname}`) === link.link) ? styles["current-page"] : ""}`} to={link.link} key={index}>
            <li key={index} className={`${styles[`link-text`]}`}>
              <h3>{link.label}</h3>
            </li>
          </Link>
        ))}
        <li key={links.length} className={`${styles[`link-text`]}`} onClick={() => {setShowSelect(!showSelect)}}>
          <div className={`${styles["link"]} ${styles["language-dropdown"]}`}>
            <select
              onChange={e => {
                localStorage.setItem("language", e.target.value);
                window.location.reload();
              }}
              defaultValue={localStorage.getItem("language") || "en"}
              name="language-select"
              className={`${styles["language-select"]}`}
            >
              <option value="de">🇩🇪 DE</option>
              <option value="en">🇬🇧 EN</option>
            </select>
          </div>
        </li>
        <Link onClick={handleLogout} className={styles["logout-link"]} to="./Anmeldung" key={links.length + 1}>
          <li key={links.length + 1} className={styles["logout-link-text"]}>
            <button
              className={styles["logout-button"]}
              onClick={() => handleLogout}>
              <FontAwesomeIcon className={styles["logout-icon"]} icon={faRightFromBracket} size="lg" />
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavBar