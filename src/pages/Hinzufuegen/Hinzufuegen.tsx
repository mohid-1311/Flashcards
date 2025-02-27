import { useState } from "react"
import {getDeck, setDecks} from "../../deckState"
import DeckModal from "../../Components/DeckModal/DeckModal";
import styles from "./Hinzufuegen.module.css"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
function Hinzufuegen(){
  
  const [decks, setLocalDecks] = useState(getDeck())

  const [deckIndex, setDeckIndex] = useState(0)

  const [showModal, setShowModal] = useState(false)

  /* 
    Diese Funktion wird im Komponent AddCardForm benutzt, 
    um eine Karte im aktuell ausgewählten Deck hinzuzufügen 
  */
  function addCardToDeck(newCard : {ausdruck: string, definition: string}, ind : number){
    const updatedDeck = decks.map((deck: { name: string; cards: any[]}, index: number) => {
      if (index === ind){
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
        <div className={styles["deck-update-container"]}>
          {/* Formular für das Hinzufügen einer Karte */}
          <AddCardForm onAddCard={addCardToDeck} deckIndex={deckIndex} decks={decks} deckName={""}/>
        </div>

        <div className={styles["deck-anzeige"]}>
            {/* Hier werden alle Karten des ausgewählten Decks ausgegeben*/}
          <ul className={styles["card-list"]}>
            {decks[deckIndex].cards.map((card: {ausdruck: string, definition: string}, index: number) => (
              <li 
                key={index} 
                className={styles["card-item"]}
                >
                Ausdruck: {card.ausdruck}<br></br>
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

      </div>
  )}

      {showModal && (
        <DeckModal
          setLocalDecks={setLocalDecks}
          decks={decks}
          setDeckIndex={setDeckIndex}
          closeModal={() => setShowModal(false)}
        />
      )}

    </>
  );
}
export default Hinzufuegen