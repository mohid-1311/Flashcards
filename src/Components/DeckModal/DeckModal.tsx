import { useState } from "react";
import styles from "./DeckModal.module.css"
import { setDecks} from "../../deckState"

type Card = {
  ausdruck: string;
  definition: string;
};

type Deck = {
  name: string;
  user: string;
  cards: Card[];
};

type DeckModalProps = {
  setLocalDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  decks: Deck[];
  setDeckIndex: React.Dispatch<React.SetStateAction<number>>; 
  closeModal: () => void;
};

function DeckModal({ setLocalDecks, decks, setDeckIndex, closeModal } : DeckModalProps){

  const currentUser = localStorage.getItem("user")?.toLowerCase() || ""
  const [searchValue, setSearchValue] = useState("")

  function addNewDeck(){
    if(decks.some(deck => deck.name.toLowerCase() === searchValue.toLowerCase())){
      alert("Deck already exists")
      return
    }
    const newDeck = {name: searchValue, user: currentUser, cards: []}

    setLocalDecks((prevDecks) => {
      const updatedDecks = [...prevDecks, newDeck]
      setDeckIndex(updatedDecks.length-1)
      setDecks(updatedDecks)
      return updatedDecks
    })
  }

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
                    setDeckIndex(index);
                    closeModal();
                  }}
                >
                  {deck.name}
                </li>
              ))}
          </ul>

          {searchValue && <button onClick={() => {addNewDeck(); closeModal()}}>Add new {searchValue} deck</button>}
      </div>
    </div>
  );
}
export default DeckModal