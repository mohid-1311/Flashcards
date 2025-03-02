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

function KlassischerModus() {
  const [decks, setDecksState] = useState<Deck[]>(getDeck());


  return (
    <>
    <div className={styles.container}>
      <h2>Klassischer Modus</h2>
      {decks.map((deck) => (
        <div key={deck.name} className={styles.deckContainer}>
          <h3>{deck.name}</h3>
          <ul>
            {deck.cards.map((card, index) => (
              <li key={index}>
                <strong>{card.ausdruck}:</strong> {card.definition}
              </li>
            ))}
          </ul>
        </div>
      ))}
    
    <div className={styles['button-container']}>
    <button className={`${styles.button} ${styles.falsch}`} >Falsch</button>
    <button className={`${styles.button} ${styles.schwer}`} >Schwer</button>
    <button className={`${styles.button} ${styles.richtig}`} >Richtig</button>
    </div>
    </div>
    </>
  );
}

export default KlassischerModus;