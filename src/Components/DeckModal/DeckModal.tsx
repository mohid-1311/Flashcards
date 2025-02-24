import { useState } from "react";
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
    <div>
      <button onClick={() => closeModal()}>Schließen</button>
      <div>
        <h2>Wähle ein Deck</h2>
        <label htmlFor="search">Suche ein Deck</label>
        <input
          value={searchValue}
          type="text"
          placeholder="Suche ein Deck..."
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          />
          <ul>
            {decks
              .filter((deck) =>
                searchValue.trim()
                  ? deck.name.toLowerCase().includes(searchValue.toLowerCase())
                  : true
              )
              .map((deck, index) => (
                <li
                  key={index}
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