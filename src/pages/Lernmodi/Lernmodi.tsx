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
            <button className={styles.button} onClick={() => handleNavigation('/freier-modus')}>Freier Modus</button>
            <button className={styles.button} onClick={() => handleNavigation('/klassischer-modus')}>Klassischer Modus</button>
            <button className={styles.button} onClick={() => handleNavigation('/schreib-modus')}>Schreib Modus</button>
        </div>
    );
}

export default Lernmodi;


