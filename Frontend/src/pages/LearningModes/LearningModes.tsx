import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LearningModes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function LearningModes() {

  const navigate = useNavigate();
  /**
   * Navigiert zu einer anderen Seite.
   * Wird genutzt um zur Startseite zurückzukommen.
   * @param path Zielpfad
   */
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  //Holt den Decknamen aus der URL.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deckName = queryParams.get('deckName');

  return (
    <>
      <span className={styles.backArrow}><FontAwesomeIcon icon={faArrowLeft} onClick={() => handleNavigation(`/Startseite`)} /> </span>
      <div className={styles.container}>
        <h1 className={styles.deckName}>{deckName}</h1>
        <h2>Spielmodus auswählen</h2>
        <div className={styles.buttonContainer}>
          <div>
            <button className={styles.button} onClick={() => handleNavigation(`/FreierModus?deckName=${deckName}`)}>Freier Lernmodus</button>
            <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
              <span className={styles.tooltip}>Freier Lernmodus: <br></br>Lerne deine Karten der Reihe nach.</span>
            </span>
          </div>
          <div>
            <button className={styles.button} onClick={() => handleNavigation(`/KlassischerModus?deckName=${deckName}`)}>Klassischer Modus</button>
            <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
              <span className={styles.tooltip}>Klassischer Lernmodus: <br></br>Lass dich abfragen, ganz klassisch.</span>
            </span>
          </div>
          <div>
            <button className={styles.button} onClick={() => handleNavigation(`/SchreibModus?deckName=${deckName}`)}>Schreib Modus</button>
            <span className={styles.infoIcon}><FontAwesomeIcon icon={faCircleInfo} />
              <span className={styles.tooltip}>Schreib Lernmodus: <br></br>Teste deine Rechtschreibung.</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningModes;
