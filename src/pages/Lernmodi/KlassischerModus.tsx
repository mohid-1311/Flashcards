import React, { useState } from 'react';
import { getDecks } from '../../deckState'; 
import styles from './KlassischerModus.module.css';
import {useLocation} from 'react-router'


interface Card {
  ausdruck: string;
  definition: string;
}

interface Deck {
  name: string;
  user:string;
  cards: Card[];
}

function KlassischerModus() {
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
        <h2>Klassischer Lernmodus</h2>
        <div className={styles.deckContainer}>
          
          {selectedDeck.cards.length > 0 && (
            
                <button onClick={handleToggleDefinition} className={styles.card}>
                  {showDefinition
                    ? selectedDeck.cards[currentIndex].definition
                    : selectedDeck.cards[currentIndex].ausdruck}
                </button>
              
          )}
        </div>
        {selectedDeck.cards.length > 0 && (
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.falsch}`} onClick={handleNextCard}>Falsch</button>
            <button className={`${styles.button} ${styles.schwer}`} onClick={handleNextCard}>Schwer</button>
            <button className={`${styles.button} ${styles.richtig}`} onClick={handleNextCard}>Richtig</button>
          </div>
        )}
      </div>
    </>
  );
}

export default KlassischerModus;