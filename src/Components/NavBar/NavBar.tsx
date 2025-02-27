import React from "react"
import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

function NavBar() {

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
        </ul>
      </h3>
    </nav>
  )
}

export default NavBar