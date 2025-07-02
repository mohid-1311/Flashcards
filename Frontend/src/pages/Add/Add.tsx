import { useState, useEffect } from "react"
import { getDeck, getDeckNames, addCard, getCards } from "../../data"
import { Card, Deck } from "../../types"; 
import DeckModal from "../../Components/DeckModal/DeckModal";
import styles from "./Add.module.css"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { useNavigate } from "react-router-dom";

function Add(){

  const navigate = useNavigate()

  const [decks, setDecks] = useState<(Deck & { id: number })[]>([]);
  const [deckIndex, setDeckIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  /* 
    Diese Funktion wird im Komponent AddCardForm benutzt, 
    um eine Karte im aktuell ausgewählten Deck hinzuzufügen 
  */

  async function loadDecks(): Promise<void> {
    try {
      const names = await getDeckNames();
      const deckObjects = await Promise.all(
        names.map(async name => {
          const deck = await getDeck(name);
          if (deck && "id" in deck) {
            const cards = await getCards(name);
            return { ...deck, cards: cards || [] };
          }
          return null;
        })
      );
      setDecks(deckObjects.filter(Boolean) as (Deck & { id: number })[]);

    } catch (err) {
      console.log("Noch keine Decks angelegt");
    }
  }


  useEffect(() => {
    loadDecks();
  }, []);

  async function addCardToDeck(newCard: Card, ind: number) {
    const deck = decks[ind];
    if (!deck || !("id" in deck)) {
      alert("Deck nicht gefunden oder keine ID vorhanden.");
      return;
    }

    await addCard(newCard, deck.id);

    // Neu laden, um State zu aktualisieren
    await loadDecks();
  }

  return(
    <>
      {!showModal && (
      <div className={styles["add-container"]}>
        <div className={styles["deck-update-container"]}>
          {decks.length === 0 ? (
            <>
              <p>Keine Decks gefunden</p>
              <button 
                type="button"
                onClick={() => navigate("/Verwaltung")}
                className={styles["management-button"]}
              >
                Zur Verwaltung
              </button>
          </>
          ) : (
            <AddCardForm onAddCard={addCardToDeck} deckIndex={deckIndex} decks={decks}/>
          )}
        </div>

        <div className={styles["deck-list"]}>
            {/* Hier werden alle Karten des ausgewählten Decks ausgegeben*/}
          {decks.length !== 0 && decks[deckIndex]?.cards &&(
            <ul className={styles["card-list"]}>
            {decks[deckIndex].cards.map((card: Card, index: number) => (
              <li 
                key={index} 
                className={styles["card-item"]}
                >
                Ausdruck: {card.term}<br></br>
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
            Stapel auswählen
          </button>
        </div>

      </div>
     )}
     {/* Wenn Deck auswählen angeklickt wurde, soll das DeckModal angezeigt  werden, damit man ein Deck auswählen kann.
     */}
      {showModal && (
        <DeckModal
          setDeckIndex={setDeckIndex}
          closeModal={() => setShowModal(false)}
          reloadDecks={loadDecks}
        />
      )}

    </>
  );
}
export default Add