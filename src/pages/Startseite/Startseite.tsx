import styles from "./Startseite.module.css"
import JetztLernen from "./JetztLernen/JetztLernen"

let decks = [
  {name: "Deutsch", lastUsed: "3", cards: []},
  {name: "Mathe", lastUsed: "5", cards: []},
  {name: "Physik", lastUsed: "4", cards: []},
  {name: "Englisch", lastUsed: "2", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
  {name: "Info", lastUsed: "1", cards: []},
]

function Startseite(){
  return(
    <div className={`${styles["flex-row"]}`}>
      <div className={styles["start-element"]}>
       <JetztLernen />
      </div>
      <div className={`${styles["flex-column"]}`}>
        <div className={styles["start-element"]}>
          Schnellstart Hinzufügen
        </div>
        <div className={styles["start-element"]}>
          Schnellstart Importieren
        </div>
      </div>
    </div>
  );
}
export default Startseite