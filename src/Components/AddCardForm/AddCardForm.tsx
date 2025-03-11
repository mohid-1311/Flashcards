import { useState } from "react";
import styles from "./AddCardForm.module.css"

type Card = {
  ausdruck: string;
  definition: string;
};

type Deck = {
  name: string;
  cards: Card[];
};

interface AddCardFormProps {
  onAddCard: (card: { ausdruck: string; definition: string }, deckIndex: number) => void;
  deckIndex: number;
  decks: Deck[]
  deckName?: string
}

/*
  Wenn der Text vom Deckname zu lang ist, sollen nur die ersten 12 Zeichen angezeigt werden
*/
export function sliceHeader(text: string, length: number = 15){
  return text.length <= length ? text : (text.slice(0, length-3) + "...")
}

function AddCardForm({ onAddCard, deckIndex = 0, decks, deckName = ""}: AddCardFormProps){
  const [ausdruck, setAusdruck] = useState("")
  const [definition, setDefinition] = useState("")

  /*
    Erstellt eine neue Karte, die dann als Parameter an onAddCard übergeben wir
    Somit wird einem Deck eine neue Karte hinzugefügt
  */
  function submitCard(e : React.FormEvent<HTMLFormElement>){

    {/*Verhindert, dass die Seite neugeladen wird. States bleiben also erhalten*/}
    e.preventDefault()

    if(!ausdruck.trim() || !definition.trim()){
      alert("Bitte füllen Sie alle Felder aus.")
      return
    }
    
    const newCard = { ausdruck, definition}
    
    let index = deckIndex
    if (deckName){
      const foundIndex = decks.findIndex((deck) => deck.name === deckName)
      if(foundIndex === -1 || foundIndex === undefined){
        alert("Kein Deck gefunden")
        return
      }
      index = foundIndex
    }

    onAddCard(newCard, index);
    setAusdruck("")
    setDefinition("")
  }
  
  return(
    <>
      <form onSubmit={submitCard} className={styles["form-container"]}>
        <h1>
          {sliceHeader(deckName || decks[deckIndex].name, 12)} - Deck
        </h1>
        <div className={styles["form-group"]}>
          {/*Ausdruck Eingabe*/}
          <label htmlFor="ausdruck" className={styles["form-label"]}>Ausdruck</label>
          <input 
            type="text" 
            name="ausdruck" 
            value={ausdruck} 
            required
            onChange={e => setAusdruck(e.target.value)}
            className={styles["form-input"]}
          />
        </div>
        <div className={styles["form-group"]}>
          {/*Definition Eingabe*/}
          <label htmlFor="definition" className={styles["form-label"]}>Definition</label>
          <textarea 
            name="definition" 
            value={definition}
            required
            onChange={(e) => setDefinition(e.target.value)}
            className={styles["form-textarea"]}
          ></textarea>
        </div>
        <div className={styles["form-group"]}>
          {/*Formular abschicken*/}
          <button 
            type="submit" 
            className={styles["form-button"]}
            >
              Karteikarte erstellen
          </button>
        </div>
      </form>
      {/*<DisplayCard ausdruck ={ausdruck} definition ={definition}></DisplayCard>*/}
    </>

  );
}
export default AddCardForm