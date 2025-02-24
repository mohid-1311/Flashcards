import { useState } from "react"
import {getDeck, setDecks} from "../../deckState"
import DeckModal from "../../Components/DeckModal/DeckModal";
import styles from "./Hinzufuegen.module.css"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
function Hinzufuegen(){
  
  const [decks, setLocalDecks] = useState(getDeck())

  const [deckIndex, setDeckIndex] = useState(0)

  const [showModal, setShowModal] = useState(false)

  /* 
    Diese Funktion wird im Komponent AddCardForm benutzt, 
    um eine Karte im aktuell ausgewählten Deck hinzuzufügen 
  */
  function addCardToDeck(newCard : {ausdruck: string, definition: string}){
    const updatedDeck = decks.map((deck: { name: string; cards: any[]}, index: number) => {
      if (index === deckIndex){
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck;
    });
    setLocalDecks(updatedDeck)
    setDecks(updatedDeck)
  }

  return(
    <>
      {!showModal && (
      <div className={styles["hinzufuegen-container"]}>
        <div>
          <h2 className={styles["current-deck-header"]}>Aktueller Stapel:
            <span className={styles["current-deck-header-text"]}>{decks[deckIndex].name}</span>
          </h2>
          {/* Formular für das Hinzufügen einer Karte */}
          <AddCardForm onAddCard={addCardToDeck} />
        </div>

        {/* Hier werden alle Karten des ausgewählten Decks ausgegeben*/}
        <ul className={styles["card-list"]}>
          {decks[deckIndex].cards.map((card: {ausdruck: string, definition: string}, index: number) => (
            <li key={index} className="card-item">
              Ausdruck: {card.ausdruck},
              Definition: {card.definition}
            </li>
          ))}
        </ul>

        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className={styles["select-deck-button"]}
        >
          Stapel Auswählen
        </button>
      </div>
  )}

      {showModal && (
        <DeckModal
          setDecks={setLocalDecks}
          decks={decks}
          setDeckindex={setDeckIndex}
          closeModal={() => setShowModal(false)}
        />
      )}

    </>
  );
}
export default Hinzufuegen