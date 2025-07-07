import { JSX, useEffect, useState } from "react"
import styles from "./Management.module.css"
import { setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"
import { Deck, Card } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faPenToSquare, faPen, faSquareCaretLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import { tl } from "../../translation";
import { updateDeck as data_updateDeck, addDeck as data_addDeck, getDecks as data_getDecks, deleteDeck as data_deleteDeck, getCards as data_getCards, deleteCard as data_deleteCard, addCard as data_addCard } from "../../data";

/**
 * Management-Komponente:
 *  - Decks-Liste
 *  - Karteikarten-Liste
 *  - Karteikarten-Bearbeitungsfeld
 * @return {JSX.Element}
 */
function Management(): JSX.Element {
  const currentUser = localStorage.getItem("user")?.toLowerCase()

  if(!currentUser) throw new Error("No user in local storage declared")
  
  const [decks, setDeckList] = useState<Deck[]>([]);
  
  const [deckIndex, setDeckIndex] = useState(-1)
  const [cardIndex, setCardIndex] = useState(-1)

  const [newDeckForm, setNewDeckForm] = useState(false)
  const [newCardForm, setNewCardForm] = useState(false)
  const [renameDeckForm, setRenameDeckForm] = useState(false)

  const [removeCardIndex, setRemoveCardIndex] = useState(-1)
  const [removeDeckIndex, setRemoveDeckIndex] = useState(-1)

  const [searchFilterDecks, setSearchFilterDecks] = useState("")
  const [searchFilterCards, setSearchFilterCards] = useState("")

  async function loadDecks() {
    const decks = await data_getDecks()
    const filtered = await Promise.all(
      decks.map(async (deck: Omit<Deck, "cards">) => {
        const cards = await data_getCards(deck.name)
        return ({...deck, cards: cards})
      })
    )
    setDeckList(filtered)
  }

  useEffect(() => {
    loadDecks();
  }, []);

  /**
   * Funktion, die überprüft, ob der Name folgende Kriterien erfüllt:
   * - Keine Decks mit gleichem Namen
   * - Keine Decks mit mit ungueltigem Namen
   *
   * @param {string} deckName - Der zu überprüfenden Name
   * @return {boolean}
   */
  function deckNameExists(deckName: string): boolean {
    return decks.some((deck: {name: string}) => (
      deckName.trim().toLowerCase() === deck.name.trim().toLowerCase()
    )) || invalidInput(deckName) // Keine Decks mit gleichem Namen oder ungueltigem Namen
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
   * @return {Promise<void>}
   */
  async function addDeck(deckName: string): Promise<void> {
    deckName = deckName.trim() // Leerzeichen vor und nach dem Namen remove

    const deck = await data_addDeck(deckName);
    setDeckIndex(deck.id)
    setRenameDeckForm(false)
    setCardIndex(-1)
    setRemoveCardIndex(-1)
    setRemoveDeckIndex(-1)
    setNewCardForm(false)
    
    await loadDecks()
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Decks 
   * aufgerufen wird, um diese nach erneutem Klick zu löschen.
   *
   * @param {number} deckId - Index der Karteikarte 
   * @return {Promise<void>}
   */
  async function removeDeck(deckId: number): Promise<void> {
    await data_deleteDeck(deckId)
    await loadDecks()
  }

  /**
   * Funktion, die beim Abschicken des Umbenennen-Formulars
   * aufgerufen wird, um den neuen Namen des Decks zu setzen.
   *
   * @param {string} newName - Neuer Name des Decks 
   * @return {Promise<void>}
   */
  async function renameDeck(newName: string): Promise<void> {
    newName = newName.trim() // Leerzeichen vor und nach dem Namen remove

    await data_updateDeck(deckIndex, newName)
    await loadDecks()
  }

  /**
   * Funktion, die beim Klicken auf den Entfernen-Button der Karteikarten 
   * aufgerufen wird, um diese nach erneutem Klick zu löschen.
   * Bearbeitetes Decks wird synchronisiert.
   *
   * @param {number} cardId - Index der Karteikarte 
   * @return {Promise<void>}
   */
  async function removeCard(cardId: number): Promise<void> {
    await data_deleteCard(cardId)
    await loadDecks()
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
  function setCardAttribute<K extends keyof Card>(attribute: K, newValue: Card[K]): void { //#TODO update simons function
    decks.find((deck: Deck) => (deck.id === deckIndex))?.cards.forEach((card: Card) => {
      if (card.id === cardIndex) {
        card[attribute] = newValue
  
        setDeckList([...decks])
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
  function deckMatchesSearchFilter(deck: {name: string}): boolean {
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
  async function addCardToDeck(newCard : Omit<Card, "id">): Promise<void> {
    await data_addCard(newCard, deckIndex)
    await loadDecks()
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
                setDeckIndex(-1)
                setRenameDeckForm(false)
                setCardIndex(-1)
                setRemoveCardIndex(-1)
                setRemoveDeckIndex(-1)
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
              key={0}
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
              decks.map((deck: Deck) => {
                if (deckMatchesSearchFilter(deck)) {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeckIndex(deck.id)
                        setRenameDeckForm(false)
                        setCardIndex(-1)
                        setRemoveCardIndex(-1)
                        setRemoveDeckIndex(-1)
                        setNewCardForm(false)
                      }} 
                      title={deck.name}
                      key={deck.id} 
                      className={(deck.id === deckIndex) ? styles["current-deck"] : undefined}
                    >
                      <div>
                        {deck.name}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          if(removeDeckIndex === deck.id) {
                            setDeckIndex(-1)
                            setRenameDeckForm(false)
                            setCardIndex(-1)
                            setRemoveCardIndex(-1)
                            setRemoveDeckIndex(-1)
                            removeDeck(deck.id)
                          } else {
                            setRemoveDeckIndex(deck.id)
                          }
                        }}
                        className={styles["deck-remove"]}
                      >
                        {
                          removeDeckIndex === deck.id ? 
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
                title={decks.find((deck: Deck) => deck.id === deckIndex)?.name}
                className={styles["deck-rename-container"]}
              >
                {
                  deckIndex !== -1 ? 
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
                            defaultValue={decks.find((deck: Deck) => deck.id === deckIndex)?.name}
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
                          {` ${decks.find((deck: Deck) => deck.id === deckIndex)?.name}`} 
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
                  setRemoveDeckIndex(-1)
                  setNewCardForm(false)
                  setSearchFilterCards(e.target.value)
                }}
              />
            </div>
            <div className={styles["deck-cards-flexbox"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karteikarte */ 
                    deckIndex !== -1 ? 
                      <tr 
                        onClick={(e) => {
                          e.stopPropagation()
                          setRenameDeckForm(false)
                          setCardIndex(-1)
                          setRemoveCardIndex(-1)
                          setRemoveDeckIndex(-1)
                          setNewCardForm(true)
                        }}
                        key={0}
                        title="Karteikarte hinzufügen"
                        id="card-add"
                      >
                        <td>
                          {
                            newCardForm ? 
                              <AddCardForm onAddCard={addCardToDeck} deckId={deckIndex} decks={decks} />
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
                    deckIndex !== -1 ?
                      decks.find((deck: Deck) => (deck.id === deckIndex))?.cards?.filter((card: Card) => cardMatchesSearchFilter(card)).map((card: Card) => (
                        <tr 
                          onClick={(e) => {
                            e.stopPropagation()
                            setCardIndex(card.id)
                            setNewCardForm(false)
                          }}
                          key={card.id}
                          className={card.id === cardIndex ? styles["current-card"] : undefined}
                        >
                          {(Object.keys({term:"", definition:""})).map((attributName) => (
                            <td key={`${card.id}-${attributName}`}>{card[attributName as keyof Card] || "<Kein Wert>"}</td>
                          ))}

                          <td>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                if(removeCardIndex === card.id) {
                                  setCardIndex(-1)
                                  setRemoveCardIndex(-1)
                                  setRemoveDeckIndex(-1)
                                  removeCard(card.id)
                                } else {
                                  setRemoveCardIndex(card.id)
                                }
                              }}
                              key={`${card.id}-remove-button`}
                              className={styles["card-remove"]}
                            >
                              {
                                removeCardIndex === card.id ? 
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
              <h3>
                {
                  cardIndex !== -1 ? 
                    "Karteikarte bearbeiten:" 
                  : 
                    <>
                      <FontAwesomeIcon icon={faSquareCaretLeft} /> Karteikarte wählen
                    </>
                }
              </h3>
            </div>
            <div className={`${styles["card-edit-flexbox"]}`}>
                
                {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */
                (deckIndex !== -1 && decks.find((deck: Deck) => (deck.id === deckIndex))?.cards.find((card: Card) => (card.id === cardIndex))) ? 
                  Object.keys({term:"", definition:""}).map((attributName, index) => (
                    <>
                      <h4 key={`${attributName}-header-${index}`}>{tl(attributName)}</h4>
                      <textarea 
                        className={styles["card-edit-input"]}
                        key={`${attributName}-text`}
                        name={attributName}
                        value={decks.find((deck: Deck) => (deck.id === deckIndex))?.cards.find((card: Card) => (card.id === cardIndex))?.[attributName as keyof Card]}
                        placeholder={`${tl(attributName)} eingeben...`}
                        required
                        onChange={(e) => {
                          e.stopPropagation()
                          setCardAttribute(attributName as keyof Card, e.target.value)
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