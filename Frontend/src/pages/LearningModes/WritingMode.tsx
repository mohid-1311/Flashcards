import React, { useState } from 'react';
import styles from './WritingMode.module.css';
import { getDecks } from '../../deckState';
import { Deck } from "../../types";
import { useLocation } from 'react-router';

function WritingMode() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const deckName = queryParams.get('deckName');
    const username = localStorage.getItem("user");
    const selectedDeck: Deck = getDecks().filter((deck:Deck) => deck.user === username).find((deck: Deck) => deck.name === deckName);
  
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    
    const handleNextCard = () => {
        setShowDefinition(false);
        setText("");
        if (currentIndex < selectedDeck.cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        setShowDefinition(true);
    };

return (
    <>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Schriftlicher Lernmodus</h2>
        <div className={styles.buttonContainer}>
          {selectedDeck.cards.length === 0 ? (
            <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>) : (
            <>
              <h3>{currentIndex+1}/{selectedDeck.cards.length}</h3>
              <button className={styles.card}>
              {showDefinition
                ? selectedDeck.cards[currentIndex].definition
                : selectedDeck.cards[currentIndex].term}
            </button>
            <button className={styles.inputField}>
                <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Tippe..."
               />
            </button>
            </>
          )}
        </div>
        {selectedDeck.cards.length > 0 && (
            <div>
                <button className={styles.button} onClick={handleSubmit}>Überprüfen</button>
                <button className={styles.button} onClick={handleNextCard}>Nächste</button>
            </div>
        )}
      </div>
    </>
  );
}

export default WritingMode;

