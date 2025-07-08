import styles from "./StartLearning.module.css"
import {Link} from "react-router-dom"

function StartLearning({deckNames}: {deckNames: string[]}) {

  return (
    <div className={styles["site-root"]}>
      <div className={styles["start-learning-header"]}>
        <h1 className={styles["start-learning-title"]}>Jetzt Lernen</h1>
      </div>
      <ul className={styles["deck-list"]}>
        {deckNames.length === 0
        ? <i><br />keine Decks gefunden</i>
        : deckNames.map(deckName => {
          return (
            <Link className={styles["deck-list-link"]} to={`/Lernmodi?deckName=${deckName}`}>
              <li className={styles["deck-list-element"]}>
                {deckName}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default StartLearning