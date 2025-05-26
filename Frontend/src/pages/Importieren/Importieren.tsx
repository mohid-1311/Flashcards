import ImportDateifeld from "../../Components/ImportDateifeld/ImportDateifeld";
import styles from "./Importieren.module.css"
import { useState } from "react"
import { Deck } from "../../types"
import { getDecks } from "../../deckState"

function Importieren(){

  const [decks, setLocalDecks] = useState(getDecks())

  const [selectedDeck, setSelectedDeck] = useState("")

  function cutString(str: string, maxLen: number = 30) {
    if (str.length <= maxLen) {
      return str
    }
    return str.substring(0, maxLen - 3) + "..."
  }

  function selectDeckOnClick(deckName: string) {
    return (e: React.MouseEvent) => {
      e.stopPropagation()
      let deck = selectedDeck
      if (deck === deckName) {
        console.log(`deselected deck ${deck}`)
        deck = ""
      } else {
        deck = deckName
        console.log(`export: selected ${deck} deck`)
      }
      setSelectedDeck(deck)
    }
  }

  return(
    <div className={styles["root"]}>
      <div className={styles["exportieren-div"]}>
        <div className={styles["exportieren-header"]}>
          <h3>Exportieren</h3>
        </div>
        <ul className={styles["exportieren-deck-liste"]}>
          {decks.length === 0
          ? <i><br />no decks available</i>
          : decks.map((deck: Deck, index: number)=> {
          return (
            <li 
              onClick={selectDeckOnClick(deck.name)} 
              className={styles["exportieren-deck-liste-element"] +
                (deck.name === selectedDeck ? " " + styles["element-ausgewaehlt"] : "")}
            >
              {cutString(deck.name)}
            </li>
          )
        })}
        </ul>
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