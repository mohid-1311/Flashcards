import { useState } from "react";
import styles from "./AddCardForm.module.css"
import { AddCardFormProps } from "../../types";

/*
  Wenn der Text vom Deckname zu lang ist, sollen nur die ersten 12 Zeichen angezeigt werden.
*/
export function sliceHeader(text: string, length: number = 15){
  return text.length <= length ? text : (text.slice(0, length-3) + "...")
}

function AddCardForm({ onAddCard, deckIndex = 0, decks}: AddCardFormProps){
  const [term, setTerm] = useState("")
  const [definition, setDefinition] = useState("")
  const [weight, setWeight] = useState(10)

  /*
    Erstellt eine neue Karte, die dann als Parameter an onAddCard übergeben wir
    Somit wird einem Deck eine neue Karte hinzugefügt
  */
  function submitCard(e : React.FormEvent<HTMLFormElement>){

    /*Verhindert, dass die Seite neugeladen wird. States bleiben also erhalten*/
    e.preventDefault()

    if(!term.trim() || !definition.trim()){
      alert("Bitte füllen Sie alle Felder aus.")
      return
    }
    
    const newCard = { term: term.trim(), definition: definition.trim(), weight }

    onAddCard(newCard, deckIndex);
    setTerm("")
    setDefinition("")
    setWeight(10)
  }
  
  return(
    <>
      <form onSubmit={submitCard} className={styles["form-container"]}>
        <h2>Deck</h2>
        {decks[deckIndex]  &&(
        <h2 title={decks[deckIndex].name} className={styles["form-header"]}>
          {decks[deckIndex].name}
        </h2>
        )}
        <div className={styles["form-group"]}>
          {/*Ausdruck Eingabe*/}
          <label htmlFor="term" className={styles["form-label"]}>Ausdruck</label>
          <input 
            type="text" 
            name="term" 
            value={term} 
            required
            onChange={e => setTerm(e.target.value)}
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
    </>

  );
}
export default AddCardForm