import React, { useState } from 'react';
import styles from './Schreibmodus.module.css';
import { getDeck } from '../../deckState';


const deckName = "Mathe"; //Deck muss übergeben werden!

interface Card {
    ausdruck: string;
    definition: string;
  }
  
  interface Deck {
    name: string;
    cards: Card[];
  }

//TO-DO: Auslagerung von Codedopplungen
function SchreibModus() {
    const decks: Deck[] = getDeck();
    const selectedDeck: Deck = decks.find((deck: Deck) => deck.name === deckName) || { name: deckName, cards: [] };

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);

    const handleNextCard = () => {
        setShowDefinition(false);
        if (currentIndex < selectedDeck.cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); //Loop zum Anfang zurück
        }
    };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

    const [text, setText] = useState<string>('');
    const [submittedText, setSubmittedText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        setSubmittedText(text);
    };

    return (
        <div className={styles.container}>
            <h2>Schreib Modus - {deckName}</h2>
            
            <input
                type = "text"
                value={text}
                onChange={handleChange}
                placeholder="..."
            />
            <button onClick={handleSubmit}>Überprüfen</button>
        </div>
    );
}

export default SchreibModus;
