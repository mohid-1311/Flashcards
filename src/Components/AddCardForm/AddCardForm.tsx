import { useState } from "react";
import styles from "./AddCardForm.module.css"


interface AddCardFormProps {
  onAddCard: (card: { ausdruck: string; definition: string }) => void;
}

function AddCardForm({ onAddCard }: AddCardFormProps){
  const [ausdruck, setAusdruck] = useState("")
  const [definition, setDefinition] = useState("")

  function submitCard(e : React.FormEvent<HTMLFormElement>){
    if(!ausdruck.trim() || !definition.trim()){
      alert("Bitte füllen Sie alle Felder aus.")
      return
    }

    e.preventDefault()

    const newCard = { ausdruck, definition}
    onAddCard(newCard);
    setAusdruck("")
    setDefinition("")
  }
  return(
    <form onSubmit={submitCard} className={styles["form-container"]}>
      <h1></h1>
      <div className={styles["form-group"]}>
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