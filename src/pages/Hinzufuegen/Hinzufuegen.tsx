import { useState } from "react"
import {getDecks, setDecks} from "../../deckState"
import { Card, Deck } from "../../types"; 
import DeckModal from "../../Components/DeckModal/DeckModal";
import styles from "./Hinzufuegen.module.css"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { useNavigate } from "react-router-dom";

function Hinzufuegen(){

  const navigate = useNavigate()
  
  const currentUser = localStorage.getItem("user")?.toLowerCase()

  const [decks, setLocalDecks] = useState(getDecks().filter((deck: Deck) => deck.user.toLowerCase() === currentUser) || [])

  const [deckIndex, setDeckIndex] = useState(0)

  const [showModal, setShowModal] = useState(false)

  /* 
    Diese Funktion wird im Komponent AddCardForm benutzt, 
    um eine Karte im aktuell ausgewählten Deck hinzuzufügen 
  */
  function addCardToDeck(newCard : Card, ind : number){
    const updatedDeck = decks.map((deck: Deck, index: number) => {
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
          {decks.length === 0 ? (
            <>
              <p>Keine Decks gefunden</p>
              <button 
                type="button"
                onClick={() => navigate("/Verwaltung")}
                className={styles["verwaltung-button"]}
              >
                Zur Verwaltung
              </button>
          </>
          ) : (
            <AddCardForm onAddCard={addCardToDeck} deckIndex={deckIndex} decks={decks}/>
          )}
        </div>

        <div className={styles["deck-anzeige"]}>
            {/* Hier werden alle Karten des ausgewählten Decks ausgegeben*/}
          {decks.length !== 0 && (
            <ul className={styles["card-list"]}>
            {decks[deckIndex].cards.map((card: Card, index: number) => (
              <li 
                key={index} 
                className={styles["card-item"]}
                >
                Ausdruck: {card.ausdruck}<br></br>
                Definition: {card.definition}
              </li>
             ))}
           </ul>
          )}

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
     {/* Wenn Deck auswählen angeklickt wurde, soll das DeckModal angezeigt  werden, damit man ein Deck auswählen kann.
     */}
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