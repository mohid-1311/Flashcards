import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Lernmodi.module.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';



function Lernmodi() {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const deckName = queryParams.get('deckName');

    return (
        <div className={styles.container}>
            <h1 className ={styles.deckName}>{deckName}</h1>
            <h2>Spielmodus auswählen</h2>
            <div className={styles.buttonContainer}>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation(`/FreierModus?deckName=${deckName}`)}>Freier Lernmodus</button>
                    <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
                        <span className={styles.tooltip}>Freier Lernmodus: <br></br>
                        Blättere einfach durch dein Deck und lerne die Karten in deinem eigenen Tempo, ohne festgelegte Abfrage oder Zeitvorgaben.
                        </span>
                    </span>
                </div>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation(`/KlassischerModus?deckName=${deckName}`)}>Klassischer Modus</button>
                    <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
                        <span className={styles.tooltip}>Klassischer Lernmodus: <br></br>Lass dich abfragen, ganz klassisch.
                        </span>
                    </span>
                </div>
                <div>
                    <button className={styles.button} onClick={() => handleNavigation(`/SchreibModus?deckName=${deckName}`)}>Schreib Modus</button>
                    <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
                        <span className={styles.tooltip}>Schreib Lernmodus: <br></br>Teste deine Rechtschreibung.
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Lernmodi;
