import styles from "./Startseite.module.css"
import JetztLernen from "./JetztLernen/JetztLernen"
import Hinzufuegen from "./Hinzufuegen/Hinzufuegen"
import ImportDateifeld from "../../Components/ImportDateifeld/ImportDateifeld"
import { useState } from "react"
import {getDecks} from "../../deckState"

function Startseite(){

  const [decks, setLocalDecks] = useState(getDecks())

  return(
    <div className={`${styles["flex-row"]}`}>
      <div className={styles["start-element"]}>
       <JetztLernen decks={decks} />
      </div>
      <div className={`${styles["flex-column"]}`}>
        <div className={styles["start-element"]}>
          <Hinzufuegen />
        </div>
        <div className={styles["start-element"]}>
          <ImportDateifeld decks={decks} setLocalDecks={setLocalDecks} />
        </div>
      </div>
    </div>
  );
}
export default Startseite