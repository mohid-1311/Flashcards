import styles from "./StartLearning.module.css"
import {Link} from "react-router-dom"

function StartLearning({decks}: {decks: any}) {

  return (
    <div className={styles["site-root"]}>
      <div className={styles["start-learning-header"]}>
        <h1 className={styles["start-learning-title"]}>Jetzt Lernen</h1>
      </div>
      <ul className={styles["deck-list"]}>
        {decks.length === 0
        ? <i><br />no decks available</i>
        : decks.map((deck: {name:string}, index: number)=> {
          return (
            <Link className={styles["deck-list-link"]} to={`/Lernmodi?deckName=${deck.name}`}>
              <li className={styles["deck-list-element"]}>
                {deck.name}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default StartLearning