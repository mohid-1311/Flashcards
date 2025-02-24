import { useState } from "react";
import styles from "./DeckModal.module.css"
type Card = {
  ausdruck: string;
  definition: string;
};

type Deck = {
  name: string;
  cards: Card[];
};

type DeckModalProps = {
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  decks: Deck[];
  setDeckindex: React.Dispatch<React.SetStateAction<number>>; 
  closeModal: () => void;
};

function DeckModal({ setDecks, decks, setDeckindex, closeModal } : DeckModalProps){

  const [searchValue, setSearchValue] = useState("")

  return(
    <div className={styles["modal-container"]}>

      <button 
        onClick={() => closeModal()}
        className={styles["close-modal"]}
      >
        &times; {/* "X" */}
      </button>

      <div className={styles["modal-content"]}>
        <h2 className={styles["modal-header"]}>Wähle ein Deck</h2>
        <label htmlFor="search">Suche ein Deck</label>
        <input
          value={searchValue}
          type="text"
          placeholder="Suche ein Deck..."
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles["search-input"]}
          />

          {/*(Gefilterte)Decks anzeigen*/}
          <ul className={styles["modal-list"]}>
            {decks
              .filter((deck) =>
                searchValue.trim()
                  ? deck.name.toLowerCase().includes(searchValue.toLowerCase())
                  : true
              )
              .map((deck, index) => (
                <li
                  key={index}
                  className={styles["modal-list-item"]}
                  onClick={() => {
                    setDeckindex(index);
                    closeModal();
                  }}
                >
                  {deck.name}
                </li>
              ))}
          </ul>
      </div>
    </div>
  );
}
export default DeckModal