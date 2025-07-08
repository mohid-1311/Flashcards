import { useState, useEffect } from 'react';
import styles from './FreeMode.module.css';
import { useLocation } from 'react-router';
import { Card } from "../../types";
import { getCards } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function FreeMode() {

  const navigate = useNavigate();
  /**
   * Navigiert zu einer anderen Seite.
   * Wird genutzt um zur Lernmodiauswahl zurückzukommen.
   * @param path Zielpfad
   */
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  //Holt den Decknamen aus der URL und den Usernamen aus dem LocalStorage.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');
  const username = localStorage.getItem("user");

  const [selectedCards, setSelectedCards] = useState<(Card & { id: number })[] | null>(null); //Karten des Decks.
  const [currentIndex, setCurrentIndex] = useState<number>(0); //Index des Kartenarray. Hat nichts mit der Karten ID aus der Datenbank zu tun.
  const [showDefinition, setShowDefinition] = useState<boolean>(false); //Wird "definition" oder "term" angezeigt?

  /**
   * Lädt die Karten des aktuellen Decks beim ersten Rendern.
   */
  useEffect(() => {
    const getDeckFromDatabase = async () => {
      if (!deckName || !username) return;
      const cards: (Card & { id: number })[] = await getCards(deckName);
      setSelectedCards(cards);
    };
    getDeckFromDatabase();
  }, [deckName, username]);


  /**
   * Ruft die nächste Karteikarte auf.
   * Setzt die Usestates wieder auf den Defaultwert.
   * Wenn der Kartenarray am Ende ist, geht es von Index 0 wieder los.
   */
  const handleNextCard = () => {
    setShowDefinition(false);
    if (selectedCards && currentIndex < selectedCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };


  /**
   * "Dreht die Karte um".
   * Invertiert den Wert "showDefinition".
   */
  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };


  return (
    <>
      <span className={styles.backArrow}><FontAwesomeIcon icon={faArrowLeft} onClick={() => handleNavigation(`/Lernmodi?deckName=${deckName}`)} /> </span>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Freier Lernmodus</h2>
        <div className={styles.buttonContainer}>
          {selectedCards == null ? (<h1 className={styles.fehlerMeldung}>Fehler beim Laden der Karten!</h1>) :
            selectedCards.length === 0 ? (
              <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>) : (
              <>
                <h3>{currentIndex + 1}/{selectedCards.length}</h3>
                <button onClick={handleToggleDefinition} className={styles.card}>
                  {showDefinition
                    ? selectedCards[currentIndex].definition
                    : selectedCards[currentIndex].term}
                </button>
              </>
            )}
        </div>
        {selectedCards && selectedCards.length > 0 && (
          <button className={styles.button} onClick={handleNextCard}>Nächste</button>
        )}
      </div>
    </>
  );
}

export default FreeMode;
