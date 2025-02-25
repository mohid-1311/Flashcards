import styles from "./JetztLernen.module.css"
import {Link} from "react-router-dom"

let decks = [
  {name: "Deutsch", color: "#000000", cards: []},
  {name: "Mathe", color: "#000080", cards: []},
  {name: "Naturwissenschaften", color: "#0000FF", cards: []},
  {name: "Info", color: "#008000", cards: []},
  {name: "Deutsch", color: "#008080", cards: []},
  {name: "Info", color: "#0080FF", cards: []},
  {name: "Info", color: "#00FF00", cards: []},
  {name: "Mathe", color: "#00FF80", cards: []},
  {name: "Naturwissenschaften", color: "#00FFFF", cards: []},
  {name: "Mathe", color: "#800000", cards: []},
  {name: "Deutsch", color: "#800080", cards: []},
  {name: "Info", color: "#8000FF", cards: []},
  {name: "Info", color: "#808000", cards: []},
  {name: "Deutsch", color: "#808080", cards: []},
  {name: "Naturwissenschaften", color: "#8080FF", cards: []},
  {name: "Info", color: "#80FF00", cards: []},
  {name: "Mathe", color: "#80FF80", cards: []},
  {name: "Info", color: "#80FFFF", cards: []},
  {name: "Info", color: "#FF0000", cards: []},
  {name: "Deutsch", color: "#FF0080", cards: []},
  {name: "Mathe", color: "#FF00FF", cards: []},
  {name: "Naturwissenschaften", color: "#FF8000", cards: []},
  {name: "Info", color: "#FF8080", cards: []},
  {name: "Info", color: "#FF80FF", cards: []},
  {name: "Naturwissenschaften", color: "#FFFF00", cards: []},
  {name: "Mathe", color: "#FFFF80", cards: []},
  {name: "Info", color: "#FFFFFF", cards: []},
]

function farbeGlaetten(hexcode: string, amount: number = 0.35) {
  let r = parseInt(hexcode.slice(1, 3), 16)
  r += (255 - r) * amount
  let g = parseInt(hexcode.slice(3, 5), 16)
  g += (255 - g) * amount
  let b = parseInt(hexcode.slice(5, 7), 16)
  b += (255 - b) * amount
  return `rgb(${r}, ${g}, ${b})`
}

function JetztLernen() {
  
  
  return (
    <div className={styles["root"]}>
      <h1>Jetzt Lernen</h1>
      <div className={styles["deck-liste"]}>
        {decks.map(deck => {
          return (
            <Link to={`/Lernen/${deck.name}`}>
              <div className={styles["deck-liste-element"]} /*style={{backgroundColor: farbeGlaetten(deck.color)}}*/>
                {deck.name}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default JetztLernen