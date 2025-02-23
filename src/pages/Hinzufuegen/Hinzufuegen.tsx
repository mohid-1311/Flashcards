import { useState } from "react"
import {getDeck, setDecks} from "../../deckState"
import DeckModal from "../../Components/DeckModal/DeckModal";
import styles from "./Hinzufuegen.module.css"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
function Hinzufuegen(){
  
  const [decks, setLocalDecks] = useState(getDeck())

  const [deckIndex, setDeckIndex] = useState(0)

  const [showModal, setShowModal] = useState(false)

  function addCardToDeck(newCard : {ausdruck: string, definition: string}){
    const updatedDeck = decks.map((deck: { name: string; cards: any[]}, index: number) => {
      if (index === deckIndex){
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck;
    });
    setLocalDecks(updatedDeck)
  }

  return(
    <div>
      <div>
      {!showModal && <h2 className={styles["current-deck-header"]}>Aktueller Stapel: <span className={styles["current-deck-header-text"]}>{decks[deckIndex].name}</span></h2>}
        {/* Formular für das Hinzufügen einer Karte */}
        {!showModal && <AddCardForm onAddCard={addCardToDeck} />}
      </div>

      <ul>
        {decks[deckIndex].cards.map((card: {ausdruck: string, definition: string}, index: number) => (
          <li key={index}>
            Ausdruck: {card.ausdruck},
            Definition: {card.definition}
          </li>
        ))}
      </ul>
      <button>

      </button>
    </div>
  );
}
export default Hinzufuegen