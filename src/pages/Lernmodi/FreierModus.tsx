import React, { useState } from 'react';
import { getDecks } from '../../deckState';
import styles from './FreierModus.module.css';
import { useLocation } from 'react-router';


interface Card {
  ausdruck: string;
  definition: string;
}

interface Deck {
  name: string;
  user: string;
  cards: Card[];
}

function FreierModus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');
  const username = localStorage.getItem("user");
  const selectedDeck: Deck = getDecks().filter((deck:Deck) => deck.user === username).find((deck: Deck) => deck.name === deckName);
  

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  const handleNextCard = () => {
    setShowDefinition(false);
    if (currentIndex < selectedDeck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Freier Lernmodus</h2>
        <div className={styles.buttonContainer}>
          {selectedDeck.cards.length === 0 ? (
            <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>) : (
            <>
              <h3>{currentIndex+1}/{selectedDeck.cards.length}</h3>
              <button onClick={handleToggleDefinition} className={styles.card}>
              {showDefinition
                ? selectedDeck.cards[currentIndex].definition
                : selectedDeck.cards[currentIndex].ausdruck}
               </button>
            </>
          )}
        </div>
        {selectedDeck.cards.length > 0 && (
            <button className={styles.button} onClick={handleNextCard}>Nächste</button>
        )}
      </div>
    </>
  );
}

export default FreierModus;
