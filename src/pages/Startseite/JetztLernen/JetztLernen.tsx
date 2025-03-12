import styles from "./JetztLernen.module.css"
import {Link} from "react-router-dom"

function JetztLernen({decks}: {decks: any}) {

  function cutString(str: string, maxLen: number = 30) {
    if (str.length <= maxLen) {
      return str
    }
    return str.substring(0, maxLen - 3) + "..."
  }

  return (
    <div className={styles["root"]}>
      <h1>Jetzt Lernen</h1>
      <ul className={styles["deck-liste"]}>
        {decks.length === 0
        ? <i><br />no decks available</i>
        : decks.map((deck: {name:string}, index: number)=> {
          return (
            <Link to={`/Lernmodi?deckName=${deck.name}`}>
              <li className={styles["deck-liste-element"]}>
                {cutString(deck.name)}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default JetztLernen