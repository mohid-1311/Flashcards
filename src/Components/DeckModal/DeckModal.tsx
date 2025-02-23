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
  showModal: () => void;
};

function DeckModal({ setDecks, decks, setDeckindex, showModal } : DeckModalProps){

  const [searchValue, setSearchValue] = useState("")

  return(
    <div>
      <div>
        <h2>Wähle ein Deck</h2>
        <label htmlFor="search">Suche ein Deck</label>
        <input
          type="text"
          placeholder="Suche ein Deck..."
          name="search"
          />
          <ul>
            {decks.map((deck, index) => (
              <li 
                key={index}
                onClick={() => {
                  setDeckindex(index);
                  showModal();
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