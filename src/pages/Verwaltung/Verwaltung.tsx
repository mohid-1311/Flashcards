import React, { useState } from "react"
import styles from "./Verwaltung.module.css"
import { getDeck, setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"

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
  cards: Card[]
}

/**
 * Verwaltung-Komponente:
 *  - Decks-Liste
 *  - Karteikarten-Liste
 *  - Karteikarten-Bearbeitungsfeld
 * @return {JSX.Element}
 */
function Verwaltung() {
  const [decks, setLocalDecks] = useState(getDeck())

  const [deckName, setDeckName] = useState("")
  const [kartenIndex, setKartenIndex] = useState(-1)

  const [neueKarteFormular, setNeueKarteFormular] = useState(false)

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
  function setzeKartenAttribut(attribut: keyof Card, neuerWert: string) {
    decks.find((deck: Deck) => deck.name === deckName).cards.map((card: Card, index: number) => {
      if(index === kartenIndex) {
        card[attribut] = neuerWert

        setLocalDecks([...decks])
        setDecks([...decks])
      }
      return card
    })
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
    if(window.confirm("Möchtest Du dieses Karteikarten-Deck wirklich löschen?")) {
      setLocalDecks(decks.filter((deck: Deck) => (deck.name !== deckName)))
      setDecks(decks.filter((deck: Deck) => (deck.name !== deckName)))
    }
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
    if(window.confirm("Möchtest Du diese Karteikarte wirklich löschen?")) {
      const updatedDecks = decks.map((deck: Deck) => {
        if (deck.name === deckName) {
          return {
            ...deck,
            cards: deck.cards.filter((card: Card, index: number) => index !== kartenIndex)
          };
        }
        return deck;
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
   * @param {Card} card - Die zu überprüfende Karte
   * @return {boolean} - True, wenn die Karteikarte dem Suchfilter entspricht
   */
  function entsprichtSuchfilterKarte(card: Card): boolean {
    return suchfilterKarten.split(" ").every(suchbegriff => 
      `${card.ausdruck} ${card.definition}`.toLowerCase().includes(suchbegriff.toLowerCase())
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
    const updatedDeck = decks.map((deck: { name: string; cards: any[]}) => {
      if (deck.name === deckName){
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck;
    });
    setLocalDecks(updatedDeck)
    setDecks(updatedDeck)
  }

  /**
   * Funktion, die den Text auf eine bestimmte Länge kürzt.
   *
   * @param {string} text - Der zu kürzende Text
   * @return {string} - Der gekürzte Text
   */
  function sliceHeader(text: string): string {
    return text.length <= 20 ? text : (text.slice(0, 17) + "...")
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
              onChange={(e) => setSuchfilterDecks(e.target.value)}
            />
          </div>
          <div className={styles["decks-liste-flexbox"]} >
            {/* Für alle Kartendecks wird ein Element hinzugefügt */
              decks.map((deck: Deck, index: number) => (
                entsprichtSuchfilterDeck(deck)
                &&
                (<div 
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeckName(deck.name)
                    setKartenIndex(-1)
                    setNeueKarteFormular(false)
                  }} 
                  key={index} 
                  className={deck.name === deckName ? styles["aktuelles-deck"] : undefined}
                >
                  {sliceHeader(deck.name)}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeckName("")
                      setKartenIndex(-1)
                      deckEntfernen(deck.name)
                    }}
                    className={styles["deck-entfernen"]}
                  >
                    X
                  </button>
                </div>)
              ))
            }
          </div>
        </div>
        <div className={styles["deck-karten-rahmen-container"]}>
          <div className={styles["deck-karten-liste-container"]}>
            <div className={styles["deck-karten-header"]}>
              <div>{deckName || "Deck wählen!"}</div>
              {/* Karteikarten-Suchleiste */}
              <input 
                className={styles["karten-suchleiste"]} 
                type="text" 
                placeholder="Karteikarten durchsuchen..." 
                onChange={(e) => setSuchfilterKarten(e.target.value)}
              />
            </div>
            <div className={styles["deck-karten-tabelle"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karte */ 
                    deckName 
                    &&
                    (<tr 
                      onClick={(e) => {
                        e.stopPropagation()
                        setKartenIndex(-1)
                        setNeueKarteFormular(true)
                      }}
                      id="karte-hinzufuegen"
                    >
                      <td>
                        {neueKarteFormular ? 
                          <AddCardForm onAddCard={addCardToDeck} deckIndex={-1} decks={decks} deckName={deckName} />
                          :
                          "+"
                        }
                      </td>
                    </tr>)
                  }
                  {/* Für alle Karteikarten wird eine Zeile hinzugefügt */
                    deckName 
                    && 
                    decks.find((deck: Deck) => (deck.name === deckName)).cards.map((card: Card, index: number) => (
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
                              X
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
            {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */}
            <h3>Karteikarte bearbeiten:</h3>
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
    </>
  )
}

export default Verwaltung