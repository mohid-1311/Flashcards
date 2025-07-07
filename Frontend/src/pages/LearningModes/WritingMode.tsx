import { useState, useEffect } from 'react';
import styles from './WritingMode.module.css';
import { useLocation } from 'react-router';
import { Card } from "../../types";
import { getCards } from "../../data";

function WritingMode() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const deckName = queryParams.get('deckName');
    const username = localStorage.getItem("user");
  
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [correct, setCorrect] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [selectedCards, setSelectedCards] = useState<(Card & { id: number })[] | null>(null);
    
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
        setText("");
        setSubmitted(false);
        if (selectedCards && currentIndex < selectedCards.length - 1) {
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
        setSubmitted(true);
        if(selectedCards) setCorrect(text.toLowerCase() === selectedCards[currentIndex].definition.toLowerCase());
    };

return (
    <>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Schriftlicher Lernmodus</h2>
        <div className={styles.buttonContainer}>
          { selectedCards == null ? (<h1 className={styles.fehlerMeldung}>Fehler beim Laden der Karten!</h1>) :
            selectedCards.length === 0 ? (
            <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>) : (
            <>
              <h3>{currentIndex+1}/{selectedCards.length}</h3>
              <button className={styles.card}>
              {showDefinition
                ? selectedCards[currentIndex].definition
                : selectedCards[currentIndex].term}
            </button>
            <button className={`${styles.inputField} ${submitted ? correct ? styles.correctInput : styles.incorrectInput : ""}`}>
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
        {selectedCards && selectedCards.length > 0 && (
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

