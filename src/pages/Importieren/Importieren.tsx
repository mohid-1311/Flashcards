import ImportDateifeld from "../../Components/ImportDateifeld/ImportDateifeld";
import styles from "./Importieren.module.css"
import { getDecks } from "../../deckState"
import { useState } from "react";

function Importieren(){

  const [decks, setLocalDecks] = useState(getDecks())

  return(
    <div className={styles.root}>
      <h1>Importieren</h1>
      <div className={styles.container}>
        <h4>DummyContent</h4>
        <div>
          <ImportDateifeld decks={decks} setLocalDecks={setLocalDecks} />
        </div>
      </div>
    </div>
  );
}
export default Importieren