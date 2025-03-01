import { useState } from "react";
import { setDecks } from "../../deckState"
import { DeckModalProps } from "../../types";
import styles from "./DeckModal.module.css"

function DeckModal({ setLocalDecks, decks, setDeckIndex, closeModal } : DeckModalProps){

  const currentUser = localStorage.getItem("user")?.toLowerCase() || ""
  const [searchValue, setSearchValue] = useState("")

  function addNewDeck(){
    if(decks.some(deck => deck.name.toLowerCase() === searchValue.toLowerCase())){
      alert("Deck existiert bereits")
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

      <div className={styles["modal-content"]}>
        
        <button 
          onClick={() => closeModal()}
          className={styles["close-modal"]}
        >
          &times; {/* "X" */}
        </button>

        <h2 className={styles["modal-header"]}>Wähle ein Deck</h2>
        <label htmlFor="search">Suche ein Deck</label>
        <input
          value={searchValue}
          autoComplete="off"
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

          {searchValue && <button className={styles["add-deck"]} onClick={() => {addNewDeck(); closeModal()}}>Add new {searchValue} deck</button>}
      </div>
    </div>
  );
}
export default DeckModal