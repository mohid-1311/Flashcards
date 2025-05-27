import styles from "./Homepage.module.css"
import StartLearning from "./StartLearning/StartLearning"
import Motivation from "../../Components/Motivation/Motivation"
import ImportField from "../../Components/ImportField/ImportField"
import { useState } from "react"
import {getDecks} from "../../deckState"

function Homepage(){

  const [decks, setLocalDecks] = useState(getDecks())

  return(
    <div className={styles["start-flex-container"]}>
      <div className={styles["start-box-learning"]}>
        <div className={styles["start-learning"]}>
          <StartLearning decks={decks} />
        </div>
      </div>
      <div className={styles["start-box-motivation"]}>
        <div className={styles["start-motivation"]}>
          <Motivation />
        </div>
      </div>
      <div className={styles["start-box-import"]}>
        <div className={styles["start-import"]}>
          {/* <h4>Schnell-Importieren</h4> */}
          <ImportField decks={decks} setLocalDecks={setLocalDecks} />
        </div>
      </div>
    </div>
  );
}
export default Homepage