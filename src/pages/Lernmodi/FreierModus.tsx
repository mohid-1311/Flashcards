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
      setCurrentIndex(0); // Loop zum Anfang zurück
    }
  };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>{deckName}</h1>
        <h2>Freier Lernmodus</h2>
        
          {selectedDeck.cards.length > 0 && (
            <button onClick={handleToggleDefinition} className={styles.card}>
              {showDefinition
                ? selectedDeck.cards[currentIndex].definition
                : selectedDeck.cards[currentIndex].ausdruck}
            </button>
          )}
        
        {selectedDeck.cards.length > 0 && (
            <button className={styles.button} onClick={handleNextCard}>Nächste</button>
        )}
      </div>
    </>
  );
}

export default FreierModus;
