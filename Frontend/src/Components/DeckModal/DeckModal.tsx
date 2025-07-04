import { useState, useEffect } from "react";
import { Deck, DeckModalProps } from "../../types";
import { getDecks } from "../../data";
import { sliceHeader } from "../AddCardForm/AddCardForm";
import styles from "./DeckModal.module.css";

function DeckModal({ setDeckIndex, closeModal, reloadDecks }:DeckModalProps) {
  const [searchValue, setSearchValue] = useState("");
  const [deckList, setDeckList] = useState<Omit<Deck, "cards">[]>([]);

  async function loadDecks() {
    const decks = await getDecks()
    const filtered = await Promise.all(
      decks.map(async (deck: Omit<Deck, "cards">) => {
        return (deck)
      })
    )
    setDeckList(filtered)
  }
  
  useEffect(() => {
    loadDecks();
  }, []);

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

    try {
      const updatedList = await getDecks();
      setDeckList(updatedList);

      const newIndex = updatedList.findIndex(deck => deck.name === trimmed);
      if (newIndex !== -1) {
        setDeckIndex(newIndex);
        await reloadDecks();
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
