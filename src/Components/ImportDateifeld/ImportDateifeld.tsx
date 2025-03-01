import { useState } from "react";
import styles from "./ImportDateifeld.module.css"
import {setDecks} from "../../deckState"

function ImportDateifeld({decks, setLocalDecks}: {decks: any, setLocalDecks: any}) {
  
  type Deck = {name: string, cards: {ausdruck: string, definition: string}[]}

  function istDeck(o: Deck) {
    if (typeof o.name !== "string") return false;
    if (typeof o.cards !== "object") return false;
    for (let card of o.cards) {
      if(typeof card.ausdruck !== "string") return false
      if(typeof card.definition !== "string") return false
    }
    return true;
  }

  const [files, setFiles] = useState<File[]>([])

  const dropHandler = async function(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if(ev.dataTransfer.items) {
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

  const dragoverHandler = function(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  const submitFiles = async function() {
    // Die Decks werden in ein Array gepackt, um sie nach der Loop auf einmal in der globalen Variable zu speichern
    let newDecks: Deck[] = []
    for (let file of files) {
      // in ein Objekt parsen
      let newDeck: Deck
      try {
        newDeck = JSON.parse(await file.text())
        console.log("JSON Object:", newDeck)
      } catch(e) {
        console.error("invalid file", e)
        continue
      }
      // das Objekt muss eine valide Deck-Struktur haben
      if(!istDeck(newDeck)) {
        console.log("ist kein deck")
        continue
      }
      // Objekt zu Decks Hinzufügen
      newDecks.push(newDeck)
    }
    setLocalDecks([...decks, ...newDecks])
    setDecks([...decks, ...newDecks])

    deleteFiles()
  }

  const deleteFiles = function() {
    setFiles([])
  }

  return (
    <div className={styles.flexContainer}>
      <div
        className={styles.dropzone}
        onDrop={dropHandler}
        onDragOver={dragoverHandler}
      >
        {(files.length < 1) ? 
          <p>drag json files here</p> :
          files.map((file: File) => {
            return (
              <div>{file.name}</div>
            )
          })
        }
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={submitFiles}>
          Importieren
        </button>
        <button onClick={deleteFiles}>
          Leeren
        </button>
      </div>
    </div>
  )
}

export default ImportDateifeld