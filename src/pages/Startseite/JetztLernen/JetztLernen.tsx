import styles from "./JetztLernen.module.css"
import {Link} from "react-router-dom"

function JetztLernen({decks}: {decks: any}) {

  return (
    <div className={styles["root"]}>
      <div className={styles["jetzt-lernen-header"]}>
        <h1 className={styles["jetzt-lernen-titel"]}>Jetzt Lernen</h1>
      </div>
      <ul className={styles["deck-liste"]}>
        {decks.length === 0
        ? <i><br />no decks available</i>
        : decks.map((deck: {name:string}, index: number)=> {
          return (
            <Link className={styles["deck-liste-link"]} to={`/Lernmodi?deckName=${deck.name}`}>
              <li className={styles["deck-liste-element"]}>
                {deck.name}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default JetztLernen