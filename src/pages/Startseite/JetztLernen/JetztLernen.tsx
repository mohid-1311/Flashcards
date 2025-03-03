import styles from "./JetztLernen.module.css"
import {Link} from "react-router-dom"

function JetztLernen({decks}: {decks: any}) {

  return (
    <div className={styles["root"]}>
      <h1>Jetzt Lernen</h1>
      <ul className={styles["deck-liste"]}>
        {decks.map((deck: {name:string}, index: number)=> {
          return (
            <Link to={`/Lernen/${deck.name}`}>
              <li className={styles["deck-liste-element"]}>
                {deck.name}
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default JetztLernen