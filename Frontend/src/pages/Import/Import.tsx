import ImportField from "../../Components/ImportField/ImportField";
import styles from "./Import.module.css"
import { useState } from "react"
// import { Deck } from "../../types"
import { getDecks } from "../../deckState"

function Import(){

  const [decks, setLocalDecks] = useState(getDecks())

  // function cutString(str: string, maxLen: number = 30) {
  //   if (str.length <= maxLen) {
  //     return str
  //   }
  //   return str.substring(0, maxLen - 3) + "..."
  // }

  return(
    <div className={styles["site-root"]}>
      <div className={styles["export-div"]}>
        <div className={styles["export-header"]}>
          <h3>Exportieren</h3>
        </div>
        {/* <ul className={styles["export-liste"]}>
          {decks.length === 0
          ? <i><br />no decks available</i>
          : decks.map((deck: Deck, index: number)=> {
          return (
            <li onClick={(e) => {return 0}} className={styles["export-liste-element"]}>
              {cutString(deck.name)}
            </li>
          )
        })}
        </ul> */}
        <h3><i>WORK IN PROGRESS</i></h3>
      </div>
      <div className={styles["import-div"]}>
        <div className={styles["import-header"]}>
          <h3>Importieren</h3>
        </div>
        <ImportField decks={decks} setLocalDecks={setLocalDecks} />
      </div>
    </div>
  );
}
export default Import