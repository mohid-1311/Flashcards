import { useState, useEffect } from 'react';
//import { getDecks } from '../../deckState';
import styles from './FreeMode.module.css';
import { useLocation } from 'react-router';
import { Card } from "../../types";
import { getCards } from "../../data";

function FreeMode() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');
  const username = localStorage.getItem("user");
  //const selectedDeck: Deck = getDecks().filter((deck:Deck) => deck.user === username).find((deck: Deck) => deck.name === deckName);
  const [selectedCards, setSelectedCards] = useState<(Card & { id: number })[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  useEffect(() => {
    const getDeckFromDatabase = async () => {
      if (!deckName || !username) return;
      const cards: (Card & { id: number })[] = await getCards(deckName);
      setSelectedCards(cards);
    };
  
    getDeckFromDatabase();
  }, [ deckName, username]);

  
  const handleNextCard = () => {
    setShowDefinition(false);
    if (selectedCards && currentIndex < selectedCards.length - 1) {
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
          { selectedCards == null ? (<h1 className={styles.fehlerMeldung}>Fehler beim Laden der Karten!</h1>) :
           selectedCards.length === 0 ? (
            <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>) : (
            <>
              <h3>{currentIndex+1}/{selectedCards.length}</h3>
              <button onClick={handleToggleDefinition} className={styles.card}>
              {showDefinition
                ? selectedCards[currentIndex].definition
                : selectedCards[currentIndex].term}
               </button>
            </>
          )}
        </div>
        {selectedCards &&selectedCards.length > 0 && (
            <button className={styles.button} onClick={handleNextCard}>Nächste</button>
        )}
      </div>
    </>
  );
}

export default FreeMode;
