import React, { useState } from 'react';
import { getDeck } from '../../deckState'; // Überprüfe, ob der Pfad korrekt ist
import styles from './KlassischerModus.module.css';

interface Card {
  ausdruck: string;
  definition: string;
}

interface Deck {
  name: string;
  cards: Card[];
}

const deckName = "Mathe"; // Variable mit dem Namen des zu verwendenden Decks


function KlassischerModus() {
  const decks: Deck[] = getDeck();
  const selectedDeck: Deck = decks.find((deck: Deck) => deck.name === deckName) || { name: deckName, cards: [] };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  const handleNextCard = () => {
    setShowDefinition(false);
    if (currentIndex < selectedDeck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Falls das Ende des Decks erreicht ist, gehe zurück zum Anfang
    }
  };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Klassischer Modus - {selectedDeck.name} </h2>
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
          <div className={styles['button-container']}>
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