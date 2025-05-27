import ImportField from "../../Components/ImportField/ImportField";
import styles from "./Import.module.css"
import { useState } from "react"
import { Deck } from "../../types"
import { getDecks } from "../../deckState"

function Import(){

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
      <div className={styles["export-div"]}>
        <div className={styles["export-header"]}>
          <h3>Exportieren</h3>
        </div>
        <div className={styles["export-body"]}>
          <ul className={styles["export-deck-list"]}>
            {decks.length === 0
            ? <i><br />no decks available</i>
            : decks.map((deck: Deck, index: number)=> {
            return (
              <li 
                onClick={selectDeckOnClick(deck.name)} 
                className={styles["export-deck-list-element"] +
                  (deck.name === selectedDeck ? " " + styles["element-chosen"] : "")}
                  >
                {cutString(deck.name)}
              </li>
            )
          })}
          </ul>
          <div className={styles["export-buttons"]}>
            <button className={styles["export-button-json"]}>
              Exportieren (.json)
            </button>
          </div>
        </div>
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