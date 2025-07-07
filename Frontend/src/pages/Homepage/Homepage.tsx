import styles from "./Homepage.module.css"
import StartLearning from "./StartLearning/StartLearning"
import Motivation from "../../Components/Motivation/Motivation"
import ImportField from "../../Components/ImportField/ImportField"
import { useEffect, useState } from "react"
import { getDecks } from "../../deckState"
import { getDeckNames } from "../../data"

function Homepage(){

  const [decks, setLocalDecks] = useState(getDecks())

  const [deckNames, setDeckNames] = useState<string[]>([])

  function addDeckName(deckName: string) {
    setDeckNames([...deckNames, deckName])
  }

  useEffect(() => {
    getDeckNames().then(names => {
      setDeckNames(names)
    })
  }, [])

  return(
    <div className={styles["start-flex-container"]}>
      <div className={styles["start-box-learning"]}>
        <div className={styles["start-learning"]}>
          <StartLearning deckNames={deckNames} />
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
          <ImportField addDeckName={addDeckName} />
        </div>
      </div>
    </div>
  );
}
export default Homepage