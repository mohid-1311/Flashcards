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
  onAddCard: (card: { ausdruck: string; definition: string }) => void;
  deckIndex: number;
  decks: Deck[]
}

/*
  Wenn der Text vom Deckname zu lang ist, sollen nur die ersten 12 Zeichen angezeigt werden
*/
function sliceHeader(text: string){
  return text.length <= 15 ? text : (text.slice(0, 12) + "...")
}

function AddCardForm({ onAddCard, deckIndex, decks }: AddCardFormProps){
  const [ausdruck, setAusdruck] = useState("")
  const [definition, setDefinition] = useState("")

  /*
    Erstellt eine neue Karte, die dann als Parameter an onAddCard übergeben wir
    Somit wird einem Deck eine neue Karte hinzugefügt
  */
  function submitCard(e : React.FormEvent<HTMLFormElement>){

    /*Verhindert, dass die Seite neugeladen wird. States bleiben also erhalten*/
    e.preventDefault()

    if(!ausdruck.trim() || !definition.trim()){
      alert("Bitte füllen Sie alle Felder aus.")
      return
    }
    
    const newCard = { ausdruck, definition}
    onAddCard(newCard);
    setAusdruck("")
    setDefinition("")
  }
  
  return(
    <form onSubmit={submitCard} className={styles["form-container"]}>
      <h1>
        {sliceHeader(decks[deckIndex].name)} - Deck
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
  );
}
export default AddCardForm