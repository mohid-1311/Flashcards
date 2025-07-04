import { useState } from "react";
import styles from "./ImportField.module.css"
import { setDecks } from "../../deckState"
import { Card, Deck } from "../../types"

function ImportField({ decks, setLocalDecks }: { decks: any, setLocalDecks: any }) {

  function isDeck(o: Deck) {
    if (typeof o.name !== "string") return false;
    if (typeof o.cards !== "object") return false;
    for (let card of o.cards) {
      if (typeof card.term !== "string") return false
      if (typeof card.definition !== "string") return false
      // weight has a standard and is therefore not required
      // if (typeof card.weight !== "number") return false
    }
    return true;
  }

  const [files, setFiles] = useState<File[]>([])

  /**
   * Funktion die ausgeführt wird wenn etwas über dem Importdateifeld gedroppt wird.
   * fügt alle .json-Dateien an den Array files-useState hinzu.
   * @param {React.DragEvent<HTMLDivElement>} ev 
   */
  const dropHandler = async function (ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Die Files werden im Array gespeichert, um sie nach der Loop zum useState hinzuzufügen
      let newFiles: File[] = []
      for (const item of ev.dataTransfer.items) {
        // falls das item keine Datei ist soll nichts getan werden.
        if (item.kind !== "file") continue
        let newFile = item.getAsFile()
        // file darf nicht null sein
        if (!newFile) continue
        // falls die Datei keine json ist soll nichts getan werden 
        if (newFile.name.split(".").at(-1) !== "json") continue
        newFiles.push(newFile)
        console.log(`file ${newFile.name} added to list`)
      }
      setFiles([...files, ...newFiles])
    }
  }

  /**
   * Funktion, die das Standardverhalten beim dragover verhindert
   * @param {React.DragEvent<HTMLDivElement>} ev 
   */
  const dragoverHandler = function (ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  /**
   * Funktion die von "Importieren"-Button aufgerufen wird
   * 
   */
  async function submitFiles() {
    let tempDecks: Deck[] = decks
    for (let file of files) {
      // in ein Objekt parsen
      let newDeck: Deck
      try {
        newDeck = JSON.parse(await file.text())
      } catch (e) {
        console.log(`parse for deck ${file.name} failed`)
        continue
      }
      console.log(`successfully parsed ${file.name}`)

      // das Objekt muss eine valide Deck-Struktur haben
      if (!isDeck(newDeck)) {
        console.log(`parsed object from ${file.name} is not a deck`)
        continue
      }

      // weight wird falls nicht vorhanden auf standard wert 10 gesetzt
      for (let card of newDeck.cards) {
        if (!card.weight) {
          card.weight = 10
        }
      }
      
      // nach Deck mit gleichem Namen suchen
      let deckToUpdate = tempDecks.find((deck: Deck) => deck.name === newDeck.name)
      
      // falls noch kein Deck mit dem Namen existiert, wird ein neues erstellt
      if(!deckToUpdate) {
        console.log(`deck ${newDeck.name} existiert noch nicht`)
        newDeck["user"] = localStorage.getItem("user")?.toLowerCase() || "default"
        tempDecks.push(newDeck)
        console.log(`deck ${newDeck.name} wurde hinzugefügt`)
        continue
      }

      // falls ein Deck mit dem Namen bereits existiert
      newDeck.cards.forEach((newCard: Card) => {
        if (deckToUpdate?.cards.every((card: Card) => card.term !== newCard.term)) {
          deckToUpdate?.cards.push(newCard)
        }
      })
      
    }
    console.log(tempDecks)
    setLocalDecks([...tempDecks])
    setDecks(tempDecks)

    deleteFiles()
  }

  /**
   * Funktion, die vom "Leeren"-Button aufgerufen wird
   * setzt das files-Array auf ein leeres Array, löscht also so die File-Objekte im Zwischenspeicher
   */
  function deleteFiles() {
    setFiles([])
  }

  return (
    <div className={styles.flexContainer}>
      <div
        className={styles.dropzone}
        onDrop={dropHandler}
        onDragOver={dragoverHandler}>
        {(files.length < 1) ?
          "json-Datei für Import hier ablegen!" :
          files.map((file: File) => {
            return (
              <div>{file.name}</div>
            )
          })
        }
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={submitFiles} className={styles.importButton}>
          Importieren
        </button>
        <button onClick={deleteFiles} className={styles.importButton}>
          Leeren
        </button>
      </div>
    </div>
  )
}

export default ImportField