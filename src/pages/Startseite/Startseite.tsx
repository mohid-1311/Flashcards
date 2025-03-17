import styles from "./Startseite.module.css"
import JetztLernen from "./JetztLernen/JetztLernen"
import Motivation from "../../Components/Motivation/Motivation"
import ImportDateifeld from "../../Components/ImportDateifeld/ImportDateifeld"
import { useState } from "react"
import {getDecks} from "../../deckState"

function Startseite(){

  const [decks, setLocalDecks] = useState(getDecks())

  return(
    <div className={`${styles["flex-row"]}`}>
      <div className={`${styles["flex-column"]}`}>
        <div className={styles["start-lernen"]}>
          <JetztLernen decks={decks} />
        </div>
      </div>
      <div className={`${styles["flex-column"]}`}>
        <div className={styles["start-unklar"]}>
          <Motivation />
        </div>
        <div className={styles["start-import"]}>
          <h4>Schnell-Importieren</h4>
          <ImportDateifeld decks={decks} setLocalDecks={setLocalDecks} />
        </div>
      </div>
    </div>
  );
}
export default Startseite