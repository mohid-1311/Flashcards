import { useState, useEffect } from 'react';
import styles from './ClassicMode.module.css';
import { useLocation } from 'react-router';
import { Card } from "../../types";
import { updateCard, getCards } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ClassicMode() {

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

  const [currentIndex, setCurrentIndex] = useState<number>(0); //Index des Kartenarray. Hat nichts mit der Karten ID aus der Datenbank zu tun.
  const [showDefinition, setShowDefinition] = useState<boolean>(false); //Wird "definition" oder "term" angezeigt?
  const [isHard, setIsHard] = useState<boolean>(false); //Ist der "schwer"-Button ausgewählt?
  const [selectedCards, setSelectedCards] = useState<(Card & { id: number })[] | null>(null); //Karten des Decks.

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
   * Passt das Gewicht (Relevanz) einer Karte basierend auf dem Ergebnis an.
   * Bei Fehler wird das Gewicht reduziert, bei richtiger Antwort erhöht.
   * Wenn als "schwer" markiert, wird die Anpassung beeinflusst.
   * @param result welcher Button gedrückt wurde
   */
  const adjustWeight = async (result: 'falsch' | 'richtig') => {
    if (!selectedCards || !username || !deckName) return;

    const currentCard = selectedCards[currentIndex];
    if (!currentCard) return;

    let newWeight = currentCard.weight;

    //falsch: -1, richtig: +2, optional zusätzlich schwer:-1
    //minimal: 1
    switch (result) {
      case 'falsch':
        newWeight = isHard ? Math.max(1, newWeight - 2) : Math.max(1, newWeight - 1);
        break;

      case 'richtig':
        newWeight = isHard ? newWeight + 1 : newWeight + 2;
        break;
    }

    //Aktualisiert Karte in Datenbank.
    await updateCard(
      username,
      deckName,
      currentCard.id,
      { weight: newWeight }
    );

    //Holt die Karten neu, um neues Gewicht zu berücksichtigen.
    const cards: (Card & { id: number })[] = await getCards(deckName);
    setSelectedCards(cards);
  };


  /**
   * Wählt zufällig einen Kartenindex, abhängig von dem Gewicht der Karte.
   * Umso niedriger das Gewicht, desto höher die Wahrscheinlichkeit.
   * @returns Index der nächsten Karte 
   */
  const getWeightedRandomIndex = (): number => {
    //Wenn es nur eine Karte gibt, wird kein Index gesucht.
    if (!selectedCards || selectedCards.length <= 1) return 0;

    let lastIndex = currentIndex;
    let newIndex = lastIndex;

    const weights = selectedCards.map(card => 1 / card.weight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    //Vermeidet, dass die gleiche Karte mehrmals hintereinander kommt.
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


  const handleNextCard = async (result: 'falsch' | 'richtig') => {
    await adjustWeight(result);
    setShowDefinition(false);
    setIsHard(false);
    setCurrentIndex(getWeightedRandomIndex());
  };


  const handleToggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };


  const handleToggleHardButton = () => {
    setIsHard(!isHard);
  };


  return (
    <>
      <span className={styles.backArrow}><FontAwesomeIcon icon={faArrowLeft} onClick={() => handleNavigation(`/Lernmodi?deckName=${deckName}`)} /> </span>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Klassischer Lernmodus</h2>
        <div className={styles.deckContainer}>
          {selectedCards == null ? (<h1 className={styles.fehlerMeldung}>Fehler beim Laden der Karten!</h1>) :
            selectedCards.length === 0 ? (
              <h1 className={styles.fehlerMeldung}>Es sind keine Karten im Deck. Füge Karten hinzu, um zu lernen!</h1>
            ) : (
              <>
                <h3>{currentIndex + 1}/{selectedCards.length}</h3>
                <button onClick={handleToggleDefinition} className={styles.card}>
                  {showDefinition ? selectedCards[currentIndex].definition : selectedCards[currentIndex].term}
                </button>
              </>
            )}
        </div>
        {selectedCards && selectedCards.length > 0 && (
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.falsch}`} onClick={() => handleNextCard('falsch')}>Falsch</button>
            <button className={`${styles.button} ${styles.schwer} ${isHard ? styles.hardButtonPressed : ''}`} onClick={() => handleToggleHardButton()}>Schwer</button>
            <button className={`${styles.button} ${styles.richtig}`} onClick={() => handleNextCard('richtig')}>Richtig</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ClassicMode;
