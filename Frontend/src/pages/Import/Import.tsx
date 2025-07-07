import ImportField from "../../Components/ImportField/ImportField";
import styles from "./Import.module.css"
import { useEffect, useState } from "react"
import { getDecks } from "../../deckState"
import { getCards, getDeck, getDeckNames } from "../../data";

function Import(){

  const [decks, setLocalDecks] = useState(getDecks())

  const [deckNames, setDeckNames] = useState<string[]>([])

  const [selectedDeck, setSelectedDeck] = useState("")

  useEffect(() => {
    getDeckNames().then(names => {
      setDeckNames(names);
    })
  }, [])

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

  async function downloadDeck() {
    let deckToExport = await getDeck(selectedDeck)
    if (deckToExport) {
      deckToExport.cards = (await getCards(deckToExport.name) || []).map(card => {
        const {id, deck_id, ...cardNoIds} = card
        return cardNoIds
      })
    } else {
      let i = 0
      while(decks[i].name !== selectedDeck && i <  decks.length) {
        i++
      }
      deckToExport = decks[i]
    }
    // die Nutzer-Property heißt manchmal "user" und manchmal "user_name"
    const {id, user, user_name, ...deckNoUser} = deckToExport as any
    const blob = new Blob([JSON.stringify(deckNoUser, null, "\t")], {type: "application/json"});
    const formatedURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = formatedURL;
    link.setAttribute('download', "Flashcards_" + deckNoUser.name + ".json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return(
    <div className={styles["site-root"]}>
      <div className={styles["export-div"]}>
        <div className={styles["export-header"]}>
          <h3>Exportieren</h3>
        </div>
        <div className={styles["export-body"]}>
          <ul className={styles["export-deck-list"]}>
            {deckNames.length === 0
              ? <i><br />no decks available</i>
              : deckNames.map((name: string) => {
                return (
                  <li 
                    onClick={selectDeckOnClick(name)} 
                    className={styles["export-deck-list-element"] +
                      (name === selectedDeck ? " " + styles["element-chosen"] : "")}
                      >
                    {cutString(name)}
                  </li>
                )
              })
            }
          </ul>
          <div className={styles["export-buttons"]}>
            <button 
              className={styles["export-button-json"]} 
              disabled={!selectedDeck}
              onClick={downloadDeck}
            >
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