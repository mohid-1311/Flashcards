import React from "react"
import { Link } from "react-router-dom"
import styles from "NavBar.module.css"

function NavBar() {

  const links = [
    {link: "./Startseite", label: "Startseite"},
    {link: "./Hinzufügen", label: "Hinzufügen"},
    {link: "./Verwaltung", label: "Verwaltung"},
    {link: "./Fortschritt", label: "Fortschritt"},
    {link: "./Importieren", label: "Importieren"},
  ]

  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}><Link to={link.link}>{link.label}</Link></li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar