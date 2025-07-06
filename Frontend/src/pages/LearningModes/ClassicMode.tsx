import React, { useState, useEffect } from 'react';
import { getDecks /*, updateCardWeight */} from '../../deckState'; 
import styles from './ClassicMode.module.css';
import { useLocation } from 'react-router';
import { Deck, Card } from "../../types";
import { updateCard, getCards } from "../../data";

function ClassicMode() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');
  const username = localStorage.getItem("user");

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] = useState<Card[] | null>(null);

  useEffect(() => {
    /* alt
  const decks: Deck[] = getDecks();
  const updatedDeck = decks.find(deck => deck.name === deckName && deck.user === username);
  if (updatedDeck) setSelectedDeck(updatedDeck); 
  */
    const getDeckFromDatabase = async () => {
      if (!deckName || !username) return;
      const cards: Card[] = await getCards(deckName);
      setSelectedCards(cards);
    };

    getDeckFromDatabase();
  }, [currentIndex, deckName, username]);
    

  const adjustWeight = async (result: 'falsch' | 'schwer' | 'richtig') => {
    if (!selectedCards) return;

    const currentCard = selectedCards.cards[currentIndex];
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

    //updateCardWeight(selectedDeck.name, currentIndex, newWeight); //alt: über local storage

    await updateCard(
      selectedCards.user,
      selectedCards.name,
      currentIndex,///////////////braucht Index von der Datenbank nicht den currentIndex
      { weight: newWeight }
    );

    const updatedDecks = getDecks();
    const updatedDeck = updatedDecks.find((deck: Deck) => deck.name === selectedCards.name && deck.user === selectedCards.user);
    if (updatedDeck) setSelectedCards(updatedDeck);
  };

  const getWeightedRandomIndex = (): number => {
  if (!selectedCards || selectedCards.cards.length <=1 ) return 0;

  let lastIndex = currentIndex; 
  let newIndex = lastIndex;

  const weights = selectedCards.cards.map(card => 1 / card.weight);
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


  const handleNextCard = async (result: 'falsch' | 'schwer' | 'richtig') => {
    await adjustWeight(result);
    setShowDefinition(false);
    setCurrentIndex(getWeightedRandomIndex());
  };

  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  if (!selectedCards) return <h1 className={styles.fehlerMeldung}>Deck nicht gefunden!</h1>;

  return (
    <div className={styles.container}>
      <h1 className={styles.deckName}>{deckName}</h1>
      <h2>Klassischer Lernmodus</h2>
      <div className={styles.deckContainer}>
        {selectedCards.cards.length === 0 ? (
          <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>
        ) : (
          <>
            <h3>{currentIndex + 1}/{selectedCards.cards.length}</h3>
            <button onClick={handleToggleDefinition} className={styles.card}>
              {showDefinition ? selectedCards.cards[currentIndex].definition : selectedCards.cards[currentIndex].term}
            </button>
          </>
        )}
      </div>
      {selectedCards.cards.length > 0 && (
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
