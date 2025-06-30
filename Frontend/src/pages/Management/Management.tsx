import { JSX, useState } from "react"
import styles from "./Management.module.css"
import { getDecks, setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { Deck, Card } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faPenToSquare, faPen, faSquareCaretLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import { tl } from "../../translation";
import { deleteDeck } from "../../data";

/**
 * Management-Komponente:
 *  - Decks-Liste
 *  - Karteikarten-Liste
 *  - Karteikarten-Bearbeitungsfeld
 * @return {JSX.Element}
 */
function Management(): JSX.Element {
  const currentUser = localStorage.getItem("user")?.toLowerCase()
  
  const [decks, setLocalDecks] = useState(getDecks().filter((deck: Deck) => deck.user.toLowerCase() === currentUser) || [])
  
  const [currentDeck, setCurrentDeck] = useState("")
  const [cardIndex, setCardIndex] = useState(-1)

  const [newDeckForm, setNewDeckForm] = useState(false)
  const [newCardForm, setNewCardForm] = useState(false)
  const [renameDeckForm, setRenameDeckForm] = useState(false)

  const [removeCardIndex, setRemoveCardIndex] = useState(-1)
  const [removeDeckIndex, setRemoveDeckIndex] = useState("")

  const [searchFilterDecks, setSearchFilterDecks] = useState("")
  const [searchFilterCards, setSearchFilterCards] = useState("")

  /**
   * Funktion, die überprüft, ob der Name folgende Kriterien erfüllt:
   * - Keine Decks mit gleichem Namen
   * - Keine Decks mit mit ungueltigem Namen
   *
   * @param {string} deckName - Der zu überprüfenden Name
   * @return {boolean}
   */
    function deckNameExists(deckName: string): boolean {
      return decks.some((deck: Deck) => (
        deckName.trim().toLowerCase() === deck.name.trim().toLowerCase()) || // Keine Decks mit gleichem Namen
        invalidInput(deckName) // Keine Decks mit ungueltigem Namen
      )
    }

    /**
     * Funktion, die überprüft, ob Eingabe folgende Kriterien erfüllt:
     * - Keine Eingabe nur aus Leerzeichen
     * - Keine Eingabe mit unsichtbarem Zeichen am Anfang
     * - Keine Eingabe mit unsichtbarem Zeichen am Ende
     *
     * @param {string} input - Die zu überprüfende Eingabe
     * @return {boolean}
     */
    function invalidInput(input: string): boolean {
      return (
        input.trim() === "" || // Keine Eingabe nur aus Leerzeichen
        input.trim().startsWith("‎") || // Keine Eingabe mit unsichtbarem Zeichen am Anfang
        input.trim().endsWith("‎") // Keine Eingabe mit unsichtbarem Zeichen am Ende
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
  function addDeck(deckName: string): void {
    deckName = deckName.trim() // Leerzeichen vor und nach dem Namen remove

    const newDecks = [...decks, {name: deckName, user: currentUser, cards: []}]
    
    setLocalDecks(newDecks)
    setDecks(newDecks)
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Decks 
   * aufgerufen wird, um diese nach einem Dialogfenster zu löschen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {string} deckName - Name des Decks 
   * @return {void}
   */
  function removeDeck(deckName: string): void {
    setLocalDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user.toLowerCase() !== currentUser)))
    setDecks(decks.filter((deck: Deck) => (deck.name !== deckName || deck.user.toLowerCase() !== currentUser)))
  }

  /**
   * Funktion, die beim Abschicken des Umbenennen-Formulars
   * aufgerufen wird, um den neuen Namen des Decks zu setzen.
   *
   * @param {string} newName - Neuer Name des Decks 
   * @return {void}
   */
  function renameDeck(newName: string): void {
    newName = newName.trim() // Leerzeichen vor und nach dem Namen remove

    const newDecks = decks.map((deck: Deck) => {
      if (deck.name === currentDeck && deck.user.toLowerCase() === currentUser) {
        return {
          ...deck,
          name: newName
        }
      }
      return deck
    })

    setLocalDecks(newDecks)
    setDecks(newDecks)

    setCurrentDeck(newName)
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Karteikarten 
   * aufgerufen wird, um diese nach einem Dialogfenster zu löschen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {number} cardIndex - Index der Karteikarte 
   * @return {void}
   */
  function karteEntfernen(cardIndex: number): void {
    const newDecks = decks.map((deck: Deck) => {
      if (deck.name === currentDeck && deck.user.toLowerCase() === currentUser) {
        return {
          ...deck,
          cards: deck.cards.filter((card: Card, index: number) => index !== cardIndex)
        }
      }
      return deck
    })

    setLocalDecks(newDecks)
    setDecks(newDecks)
  }

  /**
   * Funktion, die bei neuer Eingabe in das Attribut-Textfeld aufgerufen wird,
   * um den Wert in der entsprechenden Karteikarte zu aktualisieren.
   * Bearbeitetes Decks wird synchronisiert.
   * 
   * @param {Card} attribute - Karten-Attribut, welches verändert werden soll
   * @param {string} newValue - Neuer Wert des Karten-Attributs
   * @return {void}
   */
  function setzeKartenAttribut<K extends keyof Card>(attribute: K, newValue: Card[K]): void {
    decks.find((deck: Deck) => (deck.name === currentDeck && deck.user.toLowerCase() === currentUser))?.cards.forEach((card: Card, index: number) => {
      if (index === cardIndex) {
        card[attribute] = newValue
  
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
  function deckMatchesSearchFilter(deck: Deck): boolean {
    return searchFilterDecks.split(" ").every(searchTerm => 
      `${deck.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  /**
   * Funktion, die überprüft, ob jedes, durch ein Leerzeichen getrenntes Wort 
   * der Suchleiste mit dem Inhalt einer Karteikarte übereinstimmt.
   *
   * @param {Card} card - Die zu überprüfende Karte
   * @return {boolean} - True, wenn die Karteikarte dem Suchfilter entspricht
   */
  function cardMatchesSearchFilter(card: Card): boolean {
    return searchFilterCards.split(" ").every(searchTerm => 
      `${card.term} ${card.definition}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  /**
   * Funktion, die eine neue Karte zu dem aktuell ausgewählten Deck hinzufügt.
   * Bearbeitetes Deck wird synchronisiert.
   *
   * @param {Card} newCard - neue Karte
   * @return {void}
   */
  /* Von Mohid's Komponente */
  function addCardToDeck(newCard : Card): void {
    const newDeck = decks.map((deck: Deck) => {
      if (deck.name === currentDeck && deck.user.toLowerCase() === currentUser) {
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck
    })
    setLocalDecks(newDeck)
    setDecks(newDeck)
  }

  /* Eigentliches JSX-Element mit dem Inhalt der Seite */
  return (
    <>
      <div className={styles["management-container"]}>
        <div className={styles["decks-list-container"]}>
          <div className={styles["decks-list-header"]}>
            {/* Decks-Suchleiste */}
            <input
              className={styles["decks-searchbar"]} 
              type="text" 
              placeholder="Decks durchsuchen..." 
              onChange={(e) => {
                setCurrentDeck("")
                setRenameDeckForm(false)
                setCardIndex(-1)
                setRemoveCardIndex(-1)
                setRemoveDeckIndex("")
                setNewDeckForm(false)
                setSearchFilterDecks(e.target.value)
              }}
            />
          </div>
          <div className={styles["decks-list-flexbox"]} >
            {/* Element zum Hinzufügen eines Karteikartendecks */
            <div 
              onClick={(e) =>{
                e.stopPropagation()
                setNewDeckForm(true)
              }}
              key={-1}
              title="Karteikartendeck hinzufügen"
              id="deck-add"
            >
              {
                newDeckForm ? 
                  <form 
                    name="new-deck"
                    onKeyUp={(e) => {
                      if(e.key === "Escape") {
                        e.preventDefault()

                        setNewDeckForm(false)
                      }
                    }}
                    onSubmit={(e) => {
                      e.preventDefault()
                      
                      addDeck(((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
                      setNewDeckForm(false)
                    }}
                    className={styles["deck-add"]} 
                  >
                    <input 
                      type="text" 
                      placeholder="Name eingeben..." 
                      defaultValue={
                        deckNameExists(searchFilterDecks) ? "" : searchFilterDecks
                      }
                      minLength={2}
                      maxLength={32}
                      required
                      className={styles["deck-add"]}
                      onChange={(e) => {
                        (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement).disabled = deckNameExists(e.target.value)
                      }}
                    />
                    <button
                      type="submit"
                      className={styles["deck-add"]} 
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
              decks.filter((deck: Deck, index: number) => (deck.user.toLowerCase() === currentUser)).map((deck: Deck, index: number) => {
                if (deckMatchesSearchFilter(deck)) {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentDeck(deck.name)
                        setRenameDeckForm(false)
                        setCardIndex(-1)
                        setRemoveCardIndex(-1)
                        setRemoveDeckIndex("")
                        setNewCardForm(false)
                      }} 
                      title={deck.name}
                      key={index} 
                      className={(deck.name === currentDeck) ? styles["current-deck"] : undefined}
                    >
                      <div>
                        {deck.name}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          if(removeDeckIndex === deck.name) {
                            setCurrentDeck("")
                            setRenameDeckForm(false)
                            setCardIndex(-1)
                            setRemoveCardIndex(-1)
                            setRemoveDeckIndex("")
                            removeDeck(deck.name)
                          } else {
                            setRemoveDeckIndex(deck.name)
                          }
                        }}
                        className={styles["deck-remove"]}
                      >
                        {
                          removeDeckIndex === deck.name ? 
                            <FontAwesomeIcon icon={faCheck} />
                          : 
                            <FontAwesomeIcon icon={faXmark} /> 
                        }
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
        <div className={styles["deck-cards-rahmen-container"]}>
          <div className={styles["deck-cards-list-container"]}>
            <div className={styles["deck-cards-header"]}>
              <div 
                title={currentDeck}
                className={styles["deck-rename-container"]}
              >
                {
                  currentDeck ? 
                    (
                      renameDeckForm ?
                        <form
                          name="deck-rename"
                          onKeyUp={(e) => {
                            if(e.key === "Escape") {
                              e.preventDefault()

                              setRenameDeckForm(false)
                            }
                          }}
                          onSubmit={(e) => {
                            e.preventDefault()

                            renameDeck(((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value)
                            setRenameDeckForm(false)
                          }}
                          className={styles["deck-rename"]}
                        >
                          <input
                            type="text" 
                            placeholder="Name eingeben..." 
                            defaultValue={
                              currentDeck
                            }
                            minLength={2}
                            maxLength={32}
                            required
                            className={styles["deck-rename"]}
                            onChange={(e) => {
                              (((e.target as HTMLInputElement).parentElement as HTMLFormElement).elements[1] as HTMLButtonElement).disabled = deckNameExists(e.target.value)
                            }}
                          >
                          </input>
                          <button className={styles["deck-rename"]}>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </form>
                      :
                        <>
                          <FontAwesomeIcon 
                            onClick={() => {
                              setRenameDeckForm(true)
                            }}
                            icon={faPenToSquare}
                            className={styles["deck-rename"]} 
                          />
                          {` ` + currentDeck} 
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
                className={styles["cards-searchbar"]} 
                type="text" 
                placeholder="Karteikarten durchsuchen..." 
                onChange={(e) => {
                  setRenameDeckForm(false)
                  setCardIndex(-1)
                  setRemoveCardIndex(-1)
                  setRemoveDeckIndex("")
                  setNewCardForm(false)
                  setSearchFilterCards(e.target.value)
                }}
              />
            </div>
            <div className={styles["deck-cards-flexbox"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karteikarte */ 
                    currentDeck ? 
                      <tr 
                        onClick={(e) => {
                          e.stopPropagation()
                          setRenameDeckForm(false)
                          setCardIndex(-1)
                          setRemoveCardIndex(-1)
                          setRemoveDeckIndex("")
                          setNewCardForm(true)
                        }}
                        key={-1}
                        title="Karteikarte hinzufügen"
                        id="card-add"
                      >
                        <td>
                          {
                            newCardForm ? 
                              <AddCardForm onAddCard={addCardToDeck} deckIndex={decks.findIndex((deck: Deck) => deck.name === currentDeck)} decks={decks} />
                            :
                              <FontAwesomeIcon icon={faPlus} />
                          }
                        </td>
                        {
                          newCardForm ? 
                            <td>
                              <button
                                className={styles["card-add-form-close"]}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setNewCardForm(false)
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
                    currentDeck ?
                      decks.find((deck: Deck) => (deck.name === currentDeck && deck.user.toLowerCase() === currentUser))?.cards?.filter((card: Card) => cardMatchesSearchFilter(card)).map((card: Card, index: number) => (
                        <tr 
                          onClick={(e) => {
                            e.stopPropagation()
                            setCardIndex(index)
                            setNewCardForm(false)
                          }}
                          key={index} 
                          className={index === cardIndex ? styles["current-card"] : undefined}
                        >
                          {(Object.keys({term:"", definition:""})).map((attributName) => (
                            <td>{card[attributName as keyof Card] || "<Kein Wert>"}</td>
                          ))}

                          <td>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                if(removeCardIndex === index) {
                                  setCardIndex(-1)
                                  setRemoveCardIndex(-1)
                                  setRemoveDeckIndex("")
                                  karteEntfernen(index)
                                } else {
                                  setRemoveCardIndex(index)
                                }
                              }}
                              className={styles["card-remove"]}
                            >
                              {
                                removeCardIndex === index ? 
                                  <FontAwesomeIcon icon={faCheck} />
                                : 
                                  <FontAwesomeIcon icon={faXmark} /> 
                              }
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
          <div className={`${styles["card-edit-container"]}`}>
            <div className={`${styles["card-edit-header"]}`}>
              <h3>Karteikarte bearbeiten:</h3>
            </div>
            <div className={`${styles["card-edit-flexbox"]}`}>
                {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */
                (currentDeck && decks.find((deck: Deck) => (deck.name === currentDeck)).cards[cardIndex]) ? 
                  Object.keys({term:"", definition:""}).map((attributName, index) => (
                    <>
                      <h4 key={`${attributName}-header-${index}`}>{tl(attributName)}</h4>
                      <textarea 
                        className={styles["card-edit-input"]}
                        key={`${attributName}-text`}
                        name={attributName}
                        value={decks.find((deck: Deck) => (deck.name === currentDeck))?.cards[cardIndex][attributName as keyof Card]}
                        placeholder={`${tl(attributName)} eingeben...`}
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

export default Management