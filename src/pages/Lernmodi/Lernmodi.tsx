import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Lernmodi.module.css';

function Lernmodi() {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <h2>Spielmodus auswählen</h2>
            <div className={styles['button-container']}>
                <button className={styles.button} onClick={() => handleNavigation('/freier-modus')}>Freier Modus</button>
                <span className={styles.infoIcon}>&#9432;
                    <span className={styles.tooltip}>Information zum Freien Modus</span>
                </span>
            </div>
            <div className={styles['button-container']}>
                <button className={styles.button} onClick={() => handleNavigation('/klassischer-modus')}>Klassischer Modus</button>
                <span className={styles.infoIcon}>&#9432;
                    <span className={styles.tooltip}>Information zum Klassischen Modus</span>
                </span>
            </div>
            <div className={styles['button-container']}>
                <button className={styles.button} onClick={() => handleNavigation('/schreib-modus')}>Schreib Modus</button>
                <span className={styles.infoIcon}>&#9432;
                    <span className={styles.tooltip}>Information zum Schreibmodus</span>
                </span>
            </div>
        </div>
    );
}

export default Lernmodi;
