import React, { useState } from 'react';
import styles from './WritingMode.module.css';
import { getDecks } from '../../deckState';
import { Deck } from "../../types";
import { useLocation } from 'react-router';

function WritingMode() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const deckName = queryParams.get('deckName');
    const username = localStorage.getItem("user");
    const selectedDeck: Deck = getDecks().filter((deck:Deck) => deck.user === username).find((deck: Deck) => deck.name === deckName);
  
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    //const [submittedText, setSubmittedText] = useState<string>('');

    const handleNextCard = () => {
        setShowDefinition(false);
        setSubmitted(false);
        if (currentIndex < selectedDeck.cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop zum Anfang zurück
        }
    };
    /*
    const handleToggleDefinition = () => {
        setShowDefinition(!showDefinition);
    };
    */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        //setSubmittedText(text);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.deckName}>Schreib Modus - {deckName}</h2>
            <input
                type="text"
                value={selectedDeck.cards[currentIndex].term}
                readOnly
                placeholder="Ausdruck"
            />
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="..."
            />
            <button onClick={handleSubmit}>Überprüfen</button>
            {submitted && (
                <button onClick={handleNextCard}>
                    Nächste Karte
                </button>
            )}
            {showDefinition && (
                <div>
                    <h3>Definition:</h3>
                    <p>{selectedDeck.cards[currentIndex].definition}</p>
                </div>
            )}
        </div>
    );
}

export default WritingMode;

