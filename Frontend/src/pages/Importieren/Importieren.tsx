import ImportDateifeld from "../../Components/ImportDateifeld/ImportDateifeld";
import styles from "./Importieren.module.css"
import { useState } from "react"
// import { Deck } from "../../types"
import { getDecks } from "../../deckState"

function Importieren(){

  const [decks, setLocalDecks] = useState(getDecks())

  // function cutString(str: string, maxLen: number = 30) {
  //   if (str.length <= maxLen) {
  //     return str
  //   }
  //   return str.substring(0, maxLen - 3) + "..."
  // }

  return(
    <div className={styles["root"]}>
      <div className={styles["exportieren-div"]}>
        <div className={styles["exportieren-header"]}>
          <h3>Exportieren</h3>
        </div>
        {/* <ul className={styles["exportieren-liste"]}>
          {decks.length === 0
          ? <i><br />no decks available</i>
          : decks.map((deck: Deck, index: number)=> {
          return (
            <li onClick={(e) => {return 0}} className={styles["exportieren-liste-element"]}>
              {cutString(deck.name)}
            </li>
          )
        })}
        </ul> */}
        <h3><i>WORK IN PROGRESS</i></h3>
      </div>
      <div className={styles["importieren-div"]}>
        <div className={styles["importieren-header"]}>
          <h3>Importieren</h3>
        </div>
        <ImportDateifeld decks={decks} setLocalDecks={setLocalDecks} />
      </div>
    </div>
  );
}
export default Importieren