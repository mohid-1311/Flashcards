import { useState } from "react"
import {getDeck, setDecks} from "../../deckState"
import DeckModal from "../../Components/DeckModal/DeckModal.jsx";

function Hinzufuegen(){

  const [decks, setLocalDecks] = useState(getDeck())

  const [deckIndex, setDeckIndex] = useState(0)


  return(
    <div>
      <div>

      </div>

      <ul>
        {decks[deckIndex].cards.map((card: {ausdruck: string, definition: string}, index: number) => (
          <li key={index}>
            Ausdruck: {card.ausdruck},
            Definition: {card.definition}
          </li>
        ))}
      </ul>
      <button>

      </button>
    </div>
  );
}
export default Hinzufuegen