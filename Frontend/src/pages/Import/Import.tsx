import ImportField from "../../Components/ImportField/ImportField";
import styles from "./Import.module.css"
import { useEffect, useState } from "react"
import { ExportDeck } from "../../types";
import { getCards, getDeckNames } from "../../data";

function Import(){

  const [deckNames, setDeckNames] = useState<string[] | undefined>(undefined)

  function addDeckName(deckName: string) {
    if (deckNames === undefined) {
      setDeckNames([deckName])
    } else if (!deckNames.includes(deckName)) {
      setDeckNames([...deckNames, deckName])
    }
  }

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
    if (!selectedDeck) return

    let cardsToExport = (await getCards(selectedDeck) || []).map(card => {
      const {deck_id, id, ...cardNoIds} = card
      return cardNoIds
    })
    let deckToExport: ExportDeck = {name: selectedDeck, cards: cardsToExport}

    const blob = new Blob([JSON.stringify(deckToExport, null, "\t")], {type: "application/json"});
    const formatedURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = formatedURL;
    link.setAttribute('download', "Flashcards_" + deckToExport.name + ".json");
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
            {
              deckNames === undefined
              ? <i></i>// <img src={process.env.PUBLIC_URL + "/loading_spinner.svg"} alt="Loading Content Animation" className="loading-spinner"/>
              : deckNames.length === 0
              ? <i><br />keine Decks gefunden</i>
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
        <ImportField addDeckName={addDeckName} />
      </div>
    </div>
  );
}
export default Import