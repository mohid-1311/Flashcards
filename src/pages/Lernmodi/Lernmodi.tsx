import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Lernmodi.module.css';

//Fehlt
//Deck muss angenommen und an Lernmodus übergeben werden!

function Lernmodi() {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <h2>Spielmodus auswählen</h2>
            <div className={styles.buttonContainer}>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation('/freier-modus')}>Freier Lernmodus</button>
                    <span className={styles.infoIcon}>&#9432;
                        <span className={styles.tooltip}>Freier Lernmodus: <br></br>
                        Blättere einfach durch dein Deck und lerne die Karten in deinem eigenen Tempo, ohne festgelegte Abfrage oder Zeitvorgaben.
                        </span>
                    </span>
                </div>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation('/klassischer-modus')}>Klassischer Modus</button>
                    <span className={styles.infoIcon}>&#9432;
                        <span className={styles.tooltip}>Klassischer Lernmodus: <br></br>Lass dich abfragen, ganz klassisch.
                        </span>
                    </span>
                </div>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation('/schreib-modus')}>Schreib Modus</button>
                    <span className={styles.infoIcon}>&#9432;
                        <span className={styles.tooltip}>Schreib Lernmodus: <br></br>Teste deine Rechtschreibung.
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Lernmodi;
