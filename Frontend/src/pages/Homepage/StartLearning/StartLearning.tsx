import styles from "./StartLearning.module.css"
import {Link} from "react-router-dom"

function StartLearning({deckNames}: {deckNames: string[] | undefined}) {

  return (
    <div className={styles["site-root"]}>
      <div className={styles["start-learning-header"]}>
        <h1 className={styles["start-learning-title"]}>Jetzt Lernen</h1>
      </div>
      <ul className={styles["deck-list"]}>
        {
          deckNames === undefined
          ? <i></i> // <img src={process.env.PUBLIC_URL + "/loading_spinner.svg"} alt="Loading Content Animation" className={styles["loading-spinner"]}/>
          : deckNames.length === 0
          ? <i><br />keine Decks gefunden</i>
          : deckNames.map((deckName, index) => {
            return (
              <Link className={styles["deck-list-link"]} to={`/Lernmodi?deckName=${deckName}`} key={index}>
                <li className={styles["deck-list-element"]}>
                  {deckName}
                </li>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}

export default StartLearning