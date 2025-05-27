import React, { useState, useEffect } from 'react';
import { getDecks, updateCardWeight } from '../../deckState'; 
import styles from './ClassicMode.module.css';
import { useLocation } from 'react-router';
import { Deck } from "../../types";

function ClassicMode() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');
  const username = localStorage.getItem("user");

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  useEffect(() => {
  const decks: Deck[] = getDecks();
  const updatedDeck = decks.find(deck => deck.name === deckName && deck.user === username);
  if (updatedDeck) setSelectedDeck(updatedDeck);
  }, [currentIndex, deckName, username]);

  const adjustWeight = (result: 'falsch' | 'schwer' | 'richtig') => {
    if (!selectedDeck) return;

    const currentCard = selectedDeck.cards[currentIndex];
    if (!currentCard) return;

    let newWeight = currentCard.weight;

    switch (result) {
      case 'falsch': 
        newWeight = Math.max(1, newWeight - 2); 
        break;

      case 'schwer': 
        newWeight = Math.max(1, newWeight - 1);
        break;

      case 'richtig':
        newWeight = newWeight + 1; 
        break;
    }

    updateCardWeight(selectedDeck.name, currentIndex, newWeight);

    const updatedDecks = getDecks();
    const updatedDeck = updatedDecks.find((deck: Deck) => deck.name === selectedDeck.name && deck.user === selectedDeck.user);
    if (updatedDeck) setSelectedDeck(updatedDeck);
  };

  const getWeightedRandomIndex = (): number => {
  if (!selectedDeck || selectedDeck.cards.length <=1 ) return 0;

  let lastIndex = currentIndex; 
  let newIndex = lastIndex;

  const weights = selectedDeck.cards.map(card => 1 / card.weight);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  while (newIndex === lastIndex) { 
    const rand = Math.random() * totalWeight;
    let acc = 0;

    for (let i = 0; i < weights.length; i++) {
      acc += weights[i];
      if (rand < acc) {
        newIndex = i;
        break;
      }
    }
  }
  return newIndex;
};


  const handleNextCard = (result: 'falsch' | 'schwer' | 'richtig') => {
    adjustWeight(result);
    setShowDefinition(false);
    setCurrentIndex(getWeightedRandomIndex());
  };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  if (!selectedDeck) return <h1 className={styles.fehlerMeldung}>Deck nicht gefunden!</h1>;

  return (
    <div className={styles.container}>
      <h1 className={styles.deckName}>{deckName}</h1>
      <h2>Klassischer Lernmodus</h2>
      <div className={styles.deckContainer}>
        {selectedDeck.cards.length === 0 ? (
          <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>
        ) : (
          <>
            <h3>{currentIndex + 1}/{selectedDeck.cards.length}</h3>
            <button onClick={handleToggleDefinition} className={styles.card}>
              {showDefinition ? selectedDeck.cards[currentIndex].definition : selectedDeck.cards[currentIndex].term}
            </button>
          </>
        )}
      </div>
      {selectedDeck.cards.length > 0 && (
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.falsch}`} onClick={() => handleNextCard('falsch')}>Falsch</button>
          <button className={`${styles.button} ${styles.schwer}`} onClick={() => handleNextCard('schwer')}>Schwer</button>
          <button className={`${styles.button} ${styles.richtig}`} onClick={() => handleNextCard('richtig')}>Richtig</button>
        </div>
      )}
    </div>
  );
}

export default ClassicMode;
