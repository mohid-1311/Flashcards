import { JSX, useState } from "react"
import styles from "./Verwaltung.module.css"
import { getDecks, setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { Deck, Card } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faPenToSquare, faPen, faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons"

/**
 * Verwaltung-Komponente:
 *  - Decks-Liste
 *  - Karteikarten-Liste
 *  - Karteikarten-Bearbeitungsfeld
 * @return {JSX.Element}
 */
function Verwaltung(): JSX.Element {
  const aktuellerNutzer = localStorage.getItem("user")?.toLowerCase()
  
  const [decks, setLocalDecks] = useState(getDecks().filter((deck: Deck) => deck.user.toLowerCase() === aktuellerNutzer) || [])
  
  const [aktuellesDeck, setAktuellesDeck] = useState("")
  const [kartenIndex, setKartenIndex] = useState(-1)

  const [neuesDeckFormular, setNeuesDeckFormular] = useState(false)
  const [neueKarteFormular, setNeueKarteFormular] = useState(false)
  const [deckUmbenennenFormular, setDeckUmbenennenFormular] = useState(false)

  const [suchfilterDecks, setSuchfilterDecks] = useState("")
  const [suchfilterKarten, setSuchfilterKarten] = useState("")

  /**
   * Funktion, die überprüft, ob der Name folgende Kriterien erfüllt:
   * - Keine Decks mit gleichem Namen
   * - Keine Decks mit mit ungueltigem Namen
   *
   * @param {string} deckName - Der zu überprüfenden Name
   * @return {boolean}
   */

  

    function deckNameBelegt(deckName: string): boolean {
      return decks.some((deck: Deck) => (
        deckName.trim().toLowerCase() === deck.name.trim().toLowerCase()) || // Keine Decks mit gleichem Namen
        eingabeUngueltig(deckName) // Keine Decks mit ungueltigem Namen
      )
    }

    /**
     * Funktion, die überprüft, ob Eingabe folgende Kriterien erfüllt:
     * - Keine Eingabe nur aus Leerzeichen
     * - Keine Eingabe mit unsichtbarem Zeichen am Anfang
     * - Keine Eingabe mit unsichtbarem Zeichen am Ende
     *
     * @param {string} eingabe - Die zu überprüfende Eingabe
     * @return {boolean}
     */
    function eingabeUngueltig(eingabe: string): boolean {
      return (
        eingabe.trim() === "" || // Keine Eingabe nur aus Leerzeichen
        eingabe.trim().startsWith("‎") || // Keine Eingabe mit unsichtbarem Zeichen am Anfang
        eingabe.trim().endsWith("‎") // Keine Eingabe mit unsichtbarem Zeichen am Ende
      )
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
    deckName = deckName.trim() // Leerzeichen vor und nach dem Namen entfernen

    const neueDecks = [...decks, {name: deckName, user: aktuellerNutzer, cards: []}]
    
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
    setLocalDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user.toLowerCase() !== aktuellerNutzer)))
    setDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user.toLowerCase() !== aktuellerNutzer)))
  }

  /**
   * Funktion, die beim Abschicken des Umbenennen-Formulars
   * aufgerufen wird, um den neuen Namen des Decks zu setzen.
   *
   * @param {string} neuerWert - Neuer Name des Decks 
   * @return {void}
   */
  function deckUmbenennen(neuerWert: string): void {
    neuerWert = neuerWert.trim() // Leerzeichen vor und nach dem Namen entfernen

    const neueDecks = decks.map((deck: Deck) => {
      if (deck.name === aktuellesDeck && deck.user.toLowerCase() === aktuellerNutzer) {
        return {
          ...deck,
          name: neuerWert
        }
      }
      return deck
    })

    setLocalDecks(neueDecks)
    setDecks(neueDecks)

    setAktuellesDeck(neuerWert)
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
    const neueDecks = decks.map((deck: Deck) => {
      if (deck.name === aktuellesDeck && deck.user.toLowerCase() === aktuellerNutzer) {
        return {
          ...deck,
          cards: deck.cards.filter((card: Card, index: number) => index !== kartenIndex)
        }
      }
      return deck
    })

    setLocalDecks(neueDecks)
    setDecks(neueDecks)
  }

  /**
   * Funktion, die bei neuer Eingabe in das Attribut-Textfeld aufgerufen wird,
   * um den Wert in der entsprechenden Karteikarte zu aktualisieren.
   * Bearbeitetes Decks wird synchronisiert.
   * 
   * @param {Card} attribut - Karten-Attribut, welches verändert werden soll
   * @param {string} neuerWert - Neuer Wert des Karten-Attributs
   * @return {void}
   */
  function setzeKartenAttribut<K extends keyof Card>(attribut: K, neuerWert: Card[K]): void {
    decks.find((deck: Deck) => (deck.name === aktuellesDeck && deck.user.toLowerCase() === aktuellerNutzer))?.cards.forEach((card: Card, index: number) => {
      if (index === kartenIndex) {
        card[attribut] = neuerWert
  
        setLocalDecks([...decks])
        setDecks([...decks])
      }
    })
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
  function addCardToDeck(newCard : Card): void {
    const neuesDeck = decks.map((deck: Deck) => {
      if (deck.name === aktuellesDeck && deck.user.toLowerCase() === aktuellerNutzer) {
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
                setAktuellesDeck("")
                setDeckUmbenennenFormular(false)
                setKartenIndex(-1)
                setNeuesDeckFormular(false)
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
                    onKeyUp={(e) => {
                      if(e.key === "Escape") {
                        e.preventDefault()

                        setNeuesDeckFormular(false)
                      }
                    }}
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
                        deckNameBelegt(suchfilterDecks) ? "" : suchfilterDecks
                      }
                      minLength={2}
                      maxLength={32}
                      required
                      className={styles["deck-hinzufuegen"]}
                      onChange={(e) => {
                        (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement).disabled = deckNameBelegt(e.target.value)
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
              decks.filter((deck: Deck, index: number) => (deck.user.toLowerCase() === aktuellerNutzer)).map((deck: Deck, index: number) => {
                if (entsprichtSuchfilterDeck(deck)) {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setAktuellesDeck(deck.name)
                        setDeckUmbenennenFormular(false)
                        setKartenIndex(-1)
                        setNeueKarteFormular(false)
                      }} 
                      title={deck.name}
                      key={index} 
                      className={(deck.name === aktuellesDeck) ? styles["aktuelles-deck"] : undefined}
                    >
                      <div>
                        {deck.name}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setAktuellesDeck("")
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
                  return (null)
                }
              })
            }
          </div>
        </div>
        <div className={styles["deck-karten-rahmen-container"]}>
          <div className={styles["deck-karten-liste-container"]}>
            <div className={styles["deck-karten-header"]}>
              <div 
                title={aktuellesDeck}
                className={styles["deck-umbenennen-container"]}
              >
                {
                  aktuellesDeck ? 
                    (
                      deckUmbenennenFormular ?
                        <form
                          name="deck-umbenennen"
                          onKeyUp={(e) => {
                            if(e.key === "Escape") {
                              e.preventDefault()

                              setDeckUmbenennenFormular(false)
                            }
                          }}
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
                              aktuellesDeck
                            }
                            minLength={2}
                            maxLength={32}
                            required
                            className={styles["deck-umbenennen"]}
                            onChange={(e) => {
                              (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement).disabled = deckNameBelegt(e.target.value)
                            }}
                          >
                          </input>
                          <button className={styles["deck-umbenennen"]}>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </form>
                      :
                        <>
                          <FontAwesomeIcon 
                            onClick={() => {
                              setDeckUmbenennenFormular(true)
                            }}
                            icon={faPenToSquare}
                            className={styles["deck-umbenennen"]} 
                          />
                          {` ` + aktuellesDeck} 
                        </>
                    )
                  : 
                    <>
                      <FontAwesomeIcon icon={faSquareCaretLeft} /> 
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
                  setNeueKarteFormular(false)
                  setSuchfilterKarten(e.target.value)
                }}
              />
            </div>
            <div className={styles["deck-karten-flexbox"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karteikarte */ 
                    aktuellesDeck ? 
                      <tr 
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
                              <AddCardForm onAddCard={addCardToDeck} deckIndex={decks.findIndex((deck: Deck) => deck.name === aktuellesDeck)} decks={decks} />
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
                            null
                        }
                      </tr>
                    :
                      null
                  }
                  {/* Für alle Karteikarten wird eine Zeile hinzugefügt */
                    aktuellesDeck ?
                      decks.find((deck: Deck) => (deck.name === aktuellesDeck && deck.user.toLowerCase() === aktuellerNutzer))?.cards?.filter((karte: Card) => entsprichtSuchfilterKarte(karte)).map((karte: Card, index: number) => (
                        <tr 
                          onClick={(e) => {
                            e.stopPropagation()
                            setKartenIndex(index)
                            setNeueKarteFormular(false)
                          }}
                          key={index} 
                          className={index === kartenIndex ? styles["aktuelle-karte"] : undefined}
                        >
                          {Object.keys(karte).map((attributName) => (
                            <td>{karte[attributName as keyof Card] || "<Kein Wert>"}</td>
                          ))}

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
                      ))
                    :
                      null
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
              {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */
                (aktuellesDeck && decks.find((deck: Deck) => (deck.name === aktuellesDeck)).cards[kartenIndex]) ? 
                  Object.keys(decks.find((deck: Deck) => (deck.name === aktuellesDeck))?.cards[kartenIndex] || {}).map((attributName, index) => (
                    <>
                      <h4 key={`${attributName}-header-${index}`}>{attributName.charAt(0).toUpperCase() + attributName.slice(1)}</h4>
                      <textarea 
                        className={styles["karte-bearbeiten-eingabe"]}
                        key={`${attributName}-text`}
                        name={attributName}
                        value={decks.find((deck: Deck) => (deck.name === aktuellesDeck))?.cards[kartenIndex][attributName as keyof Card]}
                        placeholder={`${attributName.charAt(0).toUpperCase() + attributName.slice(1)} eingeben...`}
                        required
                        onChange={(e) => {
                          e.stopPropagation()
                          setzeKartenAttribut(attributName as keyof Card, e.target.value)
                        }}
                      >
                      </textarea>
                    </>
                  ))
                :
                  null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verwaltung