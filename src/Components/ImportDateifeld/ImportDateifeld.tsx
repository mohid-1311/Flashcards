import { useState } from "react";
import styles from "./ImportDateifeld.module.css"
import { setDecks } from "../../deckState"
import { Card, Deck } from "../../types"

function ImportDateifeld({ decks, setLocalDecks }: { decks: any, setLocalDecks: any }) {

  function istDeck(o: Deck) {
    if (typeof o.name !== "string") return false;
    if (typeof o.cards !== "object") return false;
    for (let card of o.cards) {
      if (typeof card.ausdruck !== "string") return false
      if (typeof card.definition !== "string") return false
    }
    return true;
  }

  const [files, setFiles] = useState<File[]>([])

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
      }
      setFiles([...files, ...newFiles])
    }
  }

  const dragoverHandler = function (event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
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
        console.log("JSON Object:", newDeck)
      } catch (e) {
        console.error("invalid file", e)
        continue
      }
      // das Objekt muss eine valide Deck-Struktur haben
      if (!istDeck(newDeck)) {
        console.log("ist kein deck")
        continue
      }
      // Objekt zu Decks Hinzufügen
      newDeck["user"] = localStorage.getItem("user")?.toLowerCase() || "default"

      let deckToUpdate = tempDecks.find((deck: Deck) => deck.name === newDeck.name)

      // falls noch kein Deck mit dem Namen existiert, wird ein neues erstellt
      if(!deckToUpdate) {
        tempDecks.push(newDeck)
        continue
      }

      // falls ein Deck mit dem Namen bereits 
      newDeck.cards.forEach((newCard: Card) => {
        if (deckToUpdate?.cards.every((card: Card) => card.ausdruck !== newCard.ausdruck)) {
          deckToUpdate?.cards.push(newCard)
        }
      })
      
    }
    setLocalDecks(tempDecks)
    setDecks(tempDecks)

    deleteFiles()
  }

  const deleteFiles = function () {
    setFiles([])
  }

  return (
    <div className={styles.flexContainer}>
      <div
        className={styles.dropzone}
        onDrop={dropHandler}
        onDragOver={dragoverHandler}>
        {(files.length < 1) ?
          "drag json files here" :
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

export default ImportDateifeld