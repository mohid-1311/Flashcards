import { JSX, useState } from "react"
import styles from "./Verwaltung.module.css"
import { getDecks, setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faSquareCaretLeft as fasFaSquareCaretLeft, faPenToSquare, faPen } from "@fortawesome/free-solid-svg-icons"

/**
 * Karteikarten-Typ mit Definition.
 * 
 * @typedef {Object} Card
 * @property {string} ausdruck - Ausdruck der Karteikarte
 * @property {string} definition - Definition des Ausdrucks der Karteikarte
 */
type Card = {
  ausdruck: string
  definition: string
}
/**
 * Karteikartendeck-Typ mit Definition.
 * 
 * @typedef {Object} Deck
 * @property {string} name - Name des Karteikartendecks
 * @property {Card[]} cards - Liste mit Karten des Karteikartendecks
 */
type Deck = {
  name: string
  user: string
  cards: Card[]
}

/**
 * Verwaltung-Komponente:
 *  - Decks-Liste
 *  - Karteikarten-Liste
 *  - Karteikarten-Bearbeitungsfeld
 * @return {JSX.Element}
 */
function Verwaltung(): JSX.Element {
  const [decks, setLocalDecks] = useState(getDecks())
  
  const [deckName, setDeckName] = useState("")
  const [kartenIndex, setKartenIndex] = useState(-1)

  const [neuesDeckFormular, setNeuesDeckFormular] = useState(false)
  const [neueKarteFormular, setNeueKarteFormular] = useState(false)
  const [deckUmbenennenFormular, setDeckUmbenennenFormular] = useState(false)

  const [suchfilterDecks, setSuchfilterDecks] = useState("")
  const [suchfilterKarten, setSuchfilterKarten] = useState("")

  /**
   * Funktion, die bei neuer Eingabe in das Attribut-Textfeld aufgerufen wird,
   * um den Wert in der entsprechenden Karteikarte zu aktualisieren.
   * Bearbeitetes Decks wird synchronisiert.
   * 
   * @param {Card} attribut - Karten-Attribut, welches verändert werden soll
   * @param {string} neuerWert - Neuer Wert des Karten-Attributs
   * @returns {void}
   */
  function setzeKartenAttribut(attribut: keyof Card, neuerWert: string): void {
    decks.find((deck: Deck) => (deck.name === deckName && deck.user === localStorage.getItem("user")))?.cards.forEach((card: Card, index: number) => {
      if (index === kartenIndex) {
        card[attribut] = neuerWert
  
        setLocalDecks([...decks])
        setDecks([...decks])
      }
    })
  }

  /** 
   * Funktion, die beim Klicken auf den Hinzufügen-Button der Decks 
   * aufgerufen wird, um ein neues Deck zur Liste der Decks hinzuzufügen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {string} deckName - Name des Decks 
   * @return {void}
   */
  function deckHinzufuegen(deckName: string): void {
    const neueDecks = [...decks, {name: deckName, user: localStorage.getItem("user"), cards: []}]
    
    setLocalDecks(neueDecks)
    setDecks(neueDecks)
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Decks 
   * aufgerufen wird, um diese nach einem Dialogfenster zu löschen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {string} deckName - Name des Decks 
   * @return {void}
   */
  function deckEntfernen(deckName: string): void {
    if (window.confirm("Möchtest Du dieses Karteikarten-Deck wirklich löschen?")) {
      setLocalDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user !== localStorage.getItem("user"))))
      setDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user !== localStorage.getItem("user"))))
    }
  }

  function deckUmbenennen(neuerWert: string): void {
    const updatedDecks = decks.map((deck: Deck) => {
      if (deck.name === deckName && deck.user === localStorage.getItem("user")) {
        return {
          ...deck,
          name: neuerWert
        }
      }
      return deck
    })

    setLocalDecks(updatedDecks)
    setDecks(updatedDecks)

    setDeckName(neuerWert)
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Karteikarten 
   * aufgerufen wird, um diese nach einem Dialogfenster zu löschen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {number} kartenIndex - Index der Karteikarte 
   * @return {void}
   */
  function karteEntfernen(kartenIndex: number): void {
    if (window.confirm("Möchtest Du diese Karteikarte wirklich löschen?")) {
      const updatedDecks = decks.map((deck: Deck) => {
        if (deck.name === deckName && deck.user === localStorage.getItem("user")) {
          return {
            ...deck,
            cards: deck.cards.filter((card: Card, index: number) => index !== kartenIndex)
          }
        }
        return deck
      })

      setLocalDecks(updatedDecks)
      setDecks(updatedDecks)
    }
  }

  /**
   * Funktion, die überprüft, ob jedes, durch ein Leerzeichen getrenntes Wort 
   * der Suchleiste mit dem Inhalt eines Decks übereinstimmt.
   *
   * @param {Deck} deck - Das zu überprüfende Deck
   * @return {boolean} - True, wenn das Deck dem Suchfilter entspricht
   */
  function entsprichtSuchfilterDeck(deck: Deck): boolean {
    return suchfilterDecks.split(" ").every(suchbegriff => 
      `${deck.name}`.toLowerCase().includes(suchbegriff.toLowerCase())
    )
  }

  /**
   * Funktion, die überprüft, ob jedes, durch ein Leerzeichen getrenntes Wort 
   * der Suchleiste mit dem Inhalt einer Karteikarte übereinstimmt.
   *
   * @param {Card} karte - Die zu überprüfende Karte
   * @return {boolean} - True, wenn die Karteikarte dem Suchfilter entspricht
   */
  function entsprichtSuchfilterKarte(karte: Card): boolean {
    return suchfilterKarten.split(" ").every(suchbegriff => 
      `${karte.ausdruck} ${karte.definition}`.toLowerCase().includes(suchbegriff.toLowerCase())
    )
  }

  /**
   * Funktion, die eine neue Karte zu dem aktuell ausgewählten Deck hinzufügt.
   * Bearbeitetes Deck wird synchronisiert.
   *
   * @param {Card} newCard - neue Karte
   * @return {void}
   */
  /* Von Mohids Komponente */
  function addCardToDeck(newCard : {ausdruck: string, definition: string}): void {
    const neuesDeck = decks.map((deck: Deck) => {
      if (deck.name === deckName && deck.user === localStorage.getItem("user")) {
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck
    })
    setLocalDecks(neuesDeck)
    setDecks(neuesDeck)
  }

  /* Eigentliches JSX-Element mit dem Inhalt der Seite */
  return (
    <>
      <div className={styles["verwaltung-container"]}>
        <div className={styles["decks-liste-container"]}>
          <div className={styles["decks-liste-header"]}>
            {/* Decks-Suchleiste */}
            <input
              className={styles["decks-suchleiste"]} 
              type="text" 
              placeholder="Decks durchsuchen..." 
              onChange={(e) => {
                setDeckName("")
                setDeckUmbenennenFormular(false)
                setKartenIndex(-1)
                setSuchfilterDecks(e.target.value)
              }}
            />
          </div>
          <div className={styles["decks-liste-flexbox"]} >
            {/* Element zum Hinzufügen eines Karteikartendecks */
            <div 
              onClick={(e) =>{
                e.stopPropagation()
                setNeuesDeckFormular(true)
              }}
              key={-1}
              title="Karteikartendeck hinzufügen"
              id="deck-hinzufuegen"
            >
              {
                neuesDeckFormular ? 
                  <form 
                    name="neues-deck"
                    onSubmit={(e) => {
                      e.preventDefault()
                      
                      deckHinzufuegen(((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
                      setNeuesDeckFormular(false)
                    }}
                    className={styles["deck-hinzufuegen"]} 
                  >
                    <input 
                      type="text" 
                      placeholder="Name eingeben..." 
                      defaultValue={
                        decks.some((deck: Deck) => deck.name.toLowerCase() === suchfilterDecks.toLowerCase()) ? "" : suchfilterDecks
                      }
                      required
                      className={styles["deck-hinzufuegen"]}
                      onChange={(e) => {
                        const buttonElement = (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement)
                        
                        if (decks.some((deck: Deck) => deck.name.toLowerCase() === e.target.value.toLowerCase())) {
                          buttonElement.disabled = true
                        } else {
                          buttonElement.disabled = false
                        }
                      }}
                    />
                    <button
                      type="submit"
                      className={styles["deck-hinzufuegen"]} 
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </form>
                : 
                  <FontAwesomeIcon icon={faPlus} />
              }
            </div>
            }
            {/* Für alle Karteikartendecks wird ein Element hinzugefügt */
              decks.filter((deck: Deck, index: number) => (deck.user === localStorage.getItem("user"))).map((deck: Deck, index: number) => {
                if (entsprichtSuchfilterDeck(deck)) {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeckName(deck.name)
                        setDeckUmbenennenFormular(false)
                        setKartenIndex(-1)
                        setNeueKarteFormular(false)
                      }} 
                      title={deck.name}
                      key={index} 
                      className={(deck.name === deckName) ? styles["aktuelles-deck"] : undefined}
                    >
                      <div>
                        {deck.name}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeckName("")
                          setDeckUmbenennenFormular(false)
                          setKartenIndex(-1)
                          deckEntfernen(deck.name)
                        }}
                        className={styles["deck-entfernen"]}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  )
                } else {
                  return (undefined)
                }
              })
            }
          </div>
        </div>
        <div className={styles["deck-karten-rahmen-container"]}>
          <div className={styles["deck-karten-liste-container"]}>
            <div className={styles["deck-karten-header"]}>
              <div 
                title={deckName}
                className={styles["deck-umbenennen-container"]}
              >
                {
                  deckName ? 
                    (
                      deckUmbenennenFormular ?
                        <>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()

                              deckUmbenennen(((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
                              setDeckUmbenennenFormular(false)
                            }}
                            className={styles["deck-umbenennen"]}
                          >
                            <input
                              type="text" 
                              placeholder="Name eingeben..." 
                              defaultValue={
                                deckName
                              }
                              required
                              className={styles["deck-umbenennen"]}
                              onChange={(e) => {
                                const buttonElement = (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement)
                                
                                if (decks.some((deck: Deck) => deck.name.toLowerCase() === e.target.value.toLowerCase()) && deckName.toLowerCase() !== e.target.value.toLowerCase()) {
                                  buttonElement.disabled = true
                                } else {
                                  buttonElement.disabled = false
                                }
                              }}
                            >
                            </input>
                            <button className={styles["deck-umbenennen"]}>
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                          </form>
                        </>
                      :
                        <>
                          <FontAwesomeIcon 
                            onClick={(e) => {
                              setDeckUmbenennenFormular(true)
                            }}
                            icon={faPenToSquare}
                            className={styles["deck-umbenennen"]} 
                          />
                          {` ` + deckName} 
                        </>
                    )
                  : 
                    <>
                      <FontAwesomeIcon icon={fasFaSquareCaretLeft} /> 
                      {` Deck wählen`}
                    </>
                }
              </div>
              {/* Karteikarten-Suchleiste */}
              <input 
                className={styles["karten-suchleiste"]} 
                type="text" 
                placeholder="Karteikarten durchsuchen..." 
                onChange={(e) => {
                  setDeckUmbenennenFormular(false)
                  setKartenIndex(-1)
                  setSuchfilterKarten(e.target.value)
                }}
              />
            </div>
            <div className={styles["deck-karten-flexbox"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karteikarte */ 
                    deckName 
                    &&
                    (<tr 
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeckUmbenennenFormular(false)
                        setKartenIndex(-1)
                        setNeueKarteFormular(true)
                      }}
                      key={-1}
                      title="Karteikarte hinzufügen"
                      id="karte-hinzufuegen"
                    >
                      <td>
                        {
                          neueKarteFormular ? 
                            <AddCardForm onAddCard={addCardToDeck} deckIndex={-1} decks={decks} deckName={deckName} />
                          :
                            <FontAwesomeIcon icon={faPlus} />
                        }
                      </td>
                      {
                        neueKarteFormular ? 
                          <td>
                            <button
                              className={styles["karte-hinzufuegen-form-schliessen"]}
                              onClick={(e) => {
                                e.stopPropagation()
                                setNeueKarteFormular(false)
                              }}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                          </td>
                        :
                          undefined
                      }
                    </tr>)
                  }
                  {/* Für alle Karteikarten wird eine Zeile hinzugefügt */
                    deckName 
                    && 
                    decks.find((deck: Deck) => (deck.name === deckName && deck.user === localStorage.getItem("user")))?.cards?.map((card: Card, index: number) => (
                      entsprichtSuchfilterKarte(card) 
                      && (
                        <tr 
                          onClick={(e) => {
                            e.stopPropagation()
                            setKartenIndex(index)
                            setNeueKarteFormular(false)
                          }}
                          key={index} 
                          className={index === kartenIndex ? styles["aktuelle-karte"] : undefined}
                        >
                          <td>{card.ausdruck}</td>
                          <td>{card.definition}</td>
                          <td>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setKartenIndex(-1)
                                karteEntfernen(index)
                              }}
                              className={styles["karte-entfernen"]}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                          </td>
                        </tr>
                      )
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${styles["karte-bearbeiten-container"]}`}>
            <div className={`${styles["karte-bearbeiten-header"]}`}>
              <h3>Karteikarte bearbeiten:</h3>
            </div>
            <div className={`${styles["karte-bearbeiten-flexbox"]}`}>
              {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */}
              {
                deckName 
                && 
                decks.find((deck: Deck) => (deck.name === deckName)).cards[kartenIndex] 
                && 
                (<>
                  <h4>Ausdruck:</h4>
                  <textarea 
                    className={styles["karte-bearbeiten-eingabe"]}
                    name="ausdruck"
                    value={decks.find((deck: Deck) => (deck.name === deckName))?.cards[kartenIndex].ausdruck}
                    placeholder="Ausdruck eingeben..."
                    onChange={(e) => {
                      e.stopPropagation()
                      setzeKartenAttribut("ausdruck", e.target.value)
                    }}
                  >
                  </textarea>
                  <h4>Definition:</h4>
                  <textarea 
                    className={styles["karte-bearbeiten-eingabe"]}
                    name="definition"
                    value={decks.find((deck: Deck) => (deck.name === deckName))?.cards[kartenIndex].definition}
                    placeholder="Definition eingeben..."
                    onChange={(e) => {
                      e.stopPropagation()
                      setzeKartenAttribut("definition", e.target.value)
                    }}
                  >
                  </textarea>
                </>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verwaltung