import { useState } from "react";
import styles from "./AddCardForm.module.css"


interface AddCardFormProps {
  onAddCard: (card: { ausdruck: string; definition: string }) => void;
}

function AddCardForm({ onAddCard }: AddCardFormProps){
  const [ausdruck, setAusdruck] = useState("")
  const [definition, setDefinition] = useState("")

  function submitCard(e){
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
    <form onSubmit={submitCard}>
      <div>
        <label htmlFor="ausdruck">Ausdruck</label>
        <input 
          type="text" 
          name="ausdruck" 
          value={ausdruck} 
          required
          onChange={e => setAusdruck(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="definition">Definition</label>
        <textarea 
          name="definition" 
          value={definition}
          required
          onChange={(e) => setDefinition(e.target.value)}
        ></textarea>
      </div>
      <div className={styles["form-group"]}>
        <button type="submit">Karteikarte erstellen</button>
      </div>
    </form>
  );
}
export default AddCardForm