import { useState, useEffect } from "react";
import { DeckModalProps } from "../../types";
import { addDeck, getDeck, getDeckNames } from "../../data";
import { sliceHeader } from "../AddCardForm/AddCardForm";
import styles from "./DeckModal.module.css";

function DeckModal({ setDeckIndex, closeModal, reloadDecks }:DeckModalProps) {
  const currentUser = localStorage.getItem("user")?.toLowerCase() || "";
  const [searchValue, setSearchValue] = useState("");
  const [deckList, setDeckList] = useState<{ name: string }[]>([]);


  useEffect(() => {
    loadDecksFromBackend();
  }, []);

  async function loadDecksFromBackend() {
    const names = await getDeckNames();
    const filtered = names.map(name => ({ name }));
    setDeckList(filtered);
  }

  async function addNewDeck() {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      alert("Ungültige Eingabe");
      return;
    }

    if (deckList.some(deck => deck.name.toLowerCase() === trimmed.toLowerCase())) {
      alert("Deck existiert bereits");
      return;
    }

    const newDeck = {
      name: trimmed,
      user: currentUser,
      cards: []
    };

    try {
      const backendDeck = await addDeck(newDeck);

      const updatedNames = await getDeckNames();
      const updatedList = updatedNames.map(name => ({ name }));
      setDeckList(updatedList);

      const newIndex = updatedList.findIndex(deck => deck.name === newDeck.name);
      console.log("setting deck index to " + newIndex);
      if (newIndex !== -1)
        {
          setDeckIndex(newIndex);
          await reloadDecks();  
          console.log("Set deckindex to " + newIndex);
        } 

    } catch (err) {
      console.error("Fehler beim Erstellen:", err);
    }
  }

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <button
          onClick={() => closeModal()}
          className={styles["close-modal"]}
        >
          &times;
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

        <ul className={styles["modal-list"]}>
          {deckList
            .filter((deck) =>
              searchValue.trim()
                ? deck.name.toLowerCase().includes(searchValue.toLowerCase())
                : true
            )
            .map((deck, index) => (
              <li
                key={deck.name}
                className={styles["modal-list-item"]}
                onClick={() => {
                  setDeckIndex(index);
                  closeModal();
                }}
              >
                {sliceHeader(deck.name, 30)}
              </li>
            ))}
        </ul>

        {searchValue.trim() && (
          <button
            className={styles["add-deck"]}
            onClick={() => {
              addNewDeck();
              closeModal();
            }}
          >
            {sliceHeader(searchValue)} Deck hinzufügen
          </button>
        )}
      </div>
    </div>
  );
}

export default DeckModal;
