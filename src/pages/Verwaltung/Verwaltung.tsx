import React, { useState } from "react"
import styles from "./Verwaltung.module.css"
import { getDeck, setDecks } from "../../deckState"
import AddCardForm from "../../Components/AddCardForm/AddCardForm"

type Card = {
  ausdruck: string
  definition: string
}

type Deck = {
  name: string
  cards: Card[]
}

function Verwaltung(){
  const [decks, setLocalDecks] = useState(getDeck())

  const [deckName, setDeckName] = useState("")
  const [kartenIndex, setKartenIndex] = useState(-1)

  const [neueKarteForm, setNeueKarteForm] = useState(false)

  /* DEAKTIVIERT
  function deckHinzufuegenForm() {
    const neuesDeckElement = document.querySelector(`.${styles["decks-liste-container"]} > div#deck-hinzufuegen`)
    
    if(neuesDeckElement) {
      if(neuesDeckElement.innerHTML === "+") {
        neuesDeckElement.innerHTML = (`
          <td><input type="text" placeholder="Name eingeben..." required class=${styles["deck-hinzufuegen"]} id="name" /></td>
          <td><button class=${styles["deck-hinzufuegen"]}>+</button></td>
        `)
        
        neuesDeckElement.querySelector("button")?.addEventListener("click", () => deckHinzufuegen())
      }
    }
  }

  function deckHinzufuegen() {
    const neuesDeckElement = document.querySelector(`.${styles["decks-liste-container"]} > div#deck-hinzufuegen`)
    
    if(neuesDeckElement) {
      /* Alle Inputs einlesen und überprüfen, ob für alle Inputs ein Wert eingegeben wurde /
      let attribute: { [key: string]: string } = {}
      let attributeCount = 0
  
      Array.from(neuesDeckElement.querySelectorAll("input")).forEach(attributInputElement => {
        if((attributInputElement as HTMLInputElement).value.length > 0) {
          attribute[attributInputElement.id] = (attributInputElement as HTMLInputElement).value
          attributeCount++
        }
      })
      
      if(attributeCount === neuesDeckElement.querySelectorAll("input").length) {
        setLocalDecks([...decks, {name: attribute["name"], cards: []}])
        setDecks([...decks, {name: attribute["name"], cards: []}])
      }
    }
  }*/

  function setzeKarteAttribut(attribut: keyof Card, neuerWert: string) {
    decks.find((deck: Deck) => deck.name === deckName).cards.map((card: Card, index: number) => {
      if(index === kartenIndex) {
        card[attribut] = neuerWert
        setLocalDecks([...decks])
        setDecks([...decks])
      }
    })
  }

  /* Von Mohids Komponente */
  function addCardToDeck(newCard : {ausdruck: string, definition: string}){
    const updatedDeck = decks.map((deck: { name: string; cards: any[]}) => {
      if (deck.name === deckName){
        return {...deck, cards: [...deck.cards, newCard]}
      }
      return deck;
    });
    setLocalDecks(updatedDeck)
    setDecks(updatedDeck)
  }

  return (
    <>
      <div className={styles["verwaltung-container"]}>
        <div className={styles["decks-liste-container"]}>
          {/* Element zum Hinzufügen eines Kartendecks 
          <div 
            onClick={deckHinzufuegenForm} 
            id="deck-hinzufuegen"
          >+</div>
          */}
          {/* Für alle Kartendecks wird ein Element hinzugefügt */}
          {decks.map((deck: Deck, index: number) => (
            <div 
              onClick={() => {
                setDeckName(deck.name)
                setKartenIndex(-1)
                setNeueKarteForm(false)
              }} 
              key={index} 
              id={deck.name.toLowerCase()}
              className={deck.name === deckName ? styles["aktuelles-deck"] : undefined}
            >
              {deck.name}
              <button className={styles["deck-entfernen"]}>X</button>
            </div>
          ))}
        </div>
        <div className={styles["deck-karten-rahmen-container"]}>
          <div className={styles["deck-karten-uebersicht-container"]}>
            <div className={styles["deck-karten-suchleiste-container"]}>
              <div>{deckName || "Kein Deck ausgewählt!"}</div>
              <input type="text" placeholder="Karteikarten durchsuchen..." onInput={() => ""}/>
            </div>
            <div className={styles["deck-karten-liste-container"]}>
              <table>
                <tbody>
                  {/* Zeile zum Hinzufügen einer Karte */ 
                  deckName &&
                  <tr 
                    onClick={() => {
                      setKartenIndex(-1)
                      setNeueKarteForm(true)
                    }}
                    id="karte-hinzufuegen"
                  >
                    {neueKarteForm ? null : <td></td>}
                    <td>
                      {neueKarteForm ? 
                        <AddCardForm onAddCard={addCardToDeck} deckIndex={0} decks={decks} />
                        :
                        "+"
                      }
                    </td>
                    {neueKarteForm ? null : <td></td>}
                  </tr>
                  }
                  {/* Für alle Karteikarten wird eine Zeile hinzugefügt */
                  deckName && 
                  decks.find((deck: Deck) => deck.name === deckName).cards.map((card: Card, index: number) => (
                    <tr 
                      onClick={() => {
                        setKartenIndex(index)
                        setNeueKarteForm(false)
                      }}
                      key={index} 
                      className={index === kartenIndex ? styles["aktuelle-karte"] : undefined}
                    >
                      <td>{card.ausdruck}</td>
                      <td>{card.definition}</td>
                      <td>
                        <button className={styles["karte-entfernen"]}>X</button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${styles["karte-bearbeiten-gruppe"]}`}>
            {/* Für jedes Karteikarten-Attribut wird eine Eingabe hinzugefügt */}
            <h3>Karteikarte bearbeiten:</h3>
            {deckName && decks.find((deck: Deck) => deck.name === deckName).cards[kartenIndex] && (
              <>
                <h4>Ausdruck:</h4>
                <textarea 
                  className={styles["karte-bearbeiten-eingabe"]}
                  name="ausdruck"
                  value={decks.find((deck: Deck) => deck.name === deckName)?.cards[kartenIndex].ausdruck}
                  placeholder="Ausdruck eingeben..."
                  onChange={(e) => setzeKarteAttribut("ausdruck", e.target.value)}
                >
                </textarea>
                <h4>Definition:</h4>
                <textarea 
                  className={styles["karte-bearbeiten-eingabe"]}
                  name="definition"
                  value={decks.find((deck: Deck) => deck.name === deckName)?.cards[kartenIndex].definition}
                  placeholder="Definition eingeben..."
                  onChange={(e) => setzeKarteAttribut("definition", e.target.value)}
                >
                </textarea>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// function onClickDeck(e: React.MouseEvent<HTMLDivElement, MouseEvent>, deckName: string) {
//   /* Je nachdem welche ID das angeklickte Element hat, wird die entsprechende Funktion aufgerufen */
//   const targetElement = (e.target as HTMLElement)
  
//   if (targetElement.className === styles["deck-entfernen"]) {
//     onClickDeckEntfernen(deckName)
//   } else {
//   }
// }

// function onClickDeckEntfernen(deckName: string) {
//   if(window.confirm("Möchtest Du dieses Karteikarten-Deck wirklich löschen?")) {
//     decks = decks.filter(deck => deck.name !== deckName)
//     setDecks(decks)
//     onClickDeckAnzeigen("")
//   }
// }

function onInputSuche() {
  /* Karte-Bearbeiten Feld verstecken */
  document.querySelector(`.${styles["karte-bearbeiten-gruppe"]}`)?.classList.add(styles["verstecken"])
  document.querySelector(`.${styles["deck-karten-uebersicht-container"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

  /* Element mit dem aktuellen Wert der Suchleiste abrufen */
  const suchleisteElement = (document.querySelector(`.${styles["deck-karten-suchleiste-container"]} > input`) as HTMLInputElement)
  if(!suchleisteElement) return
  const suchleisteWert = suchleisteElement.value
  
  const kartenListeElement = document.querySelector(`.${styles["deck-karten-liste-container"]} > table > tbody`)
  if(!kartenListeElement) return
  const cards = kartenListeElement?.querySelectorAll("tr")

  cards?.forEach(card => {
    /* Wenn die Infos der Karte Teile des Suchbegriffs enthalten, wird sie angezeigt, ansonsten ausgeblendet */
    const kartenInhalt = Array.from(card.querySelectorAll("td")).map(td => td.textContent).join(" ")
    
    if (card.id === "karte-hinzufuegen" || kartenInhalt.toLowerCase().includes(suchleisteWert.toLowerCase())) {
      card.style.display = ""
    } else {
      card.style.display = "none"
    }
  })
}

// function onClickReihe(e : MouseEvent, deckName : string, kartenIndex: string) {
//   /* Wenn ein Deck existiert, dieses mit Karten laden */
//   const deck = decks.find(deck => deck.name === deckName)
//   if(!deck) return

//   const card = deck.cards.find((_, index) => index.toString() === kartenIndex)
//   if(!card) return

//   /* Je nachdem welche ID das angeklickte Element hat, wird die entsprechende Funktion aufgerufen */
//   const targetElement = (e.target as HTMLElement)
  
//   if (targetElement.className === styles["karte-entfernen"]) {
//     onClickKarteEntfernen(deckName, kartenIndex)
//   } else {
//     onClickKarteBearbeiten(deckName, kartenIndex)
//   }
// }

// function onClickKarteEntfernen(deckName : string, kartenIndex: string) {
//   /* Karte-Bearbeiten Feld verstecken */
//   document.querySelector(`.${styles["karte-bearbeiten-gruppe"]}`)?.classList.add(styles["verstecken"])
//   document.querySelector(`.${styles["deck-karten-uebersicht-container"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

//   const kartenListeElement = document.querySelector(`.${styles["deck-karten-liste-container"]} > table > tbody`)

//   /* Überprüfen, ob ein gültiger Index gefunden wurde und ob der Nutzer die Karteikarte wirklich löschen möchte */
//   if (kartenIndex && window.confirm("Möchtest Du diese Karteikarte wirklich löschen?")) {
//     const deck = decks.find(deck => deck.name === deckName)

//     if (deck) {
//       const kartenIndexNum = deck.cards.findIndex((_, index) => index.toString() === kartenIndex)
      
//       if (kartenIndexNum !== -1) {
//         /* Karte löschen und Frontend aktualisieren */
//         deck.cards.splice(kartenIndexNum, 1)

//         setDecks(decks)
//         onClickDeckAnzeigen(deckName)
//       }
//     }
//   }
// }

// function onClickAttributBearbeiten(deckName: string, kartenIndex : string, attribut : KarteikartenAttribute) {
//   const deck = decks.find(deck => deck.name === deckName)

//   if (deck) {
//     const kartenIndexNum = deck.cards.findIndex((_, index) => index.toString() === kartenIndex)
    
//     if (kartenIndexNum !== -1) {
//       const aktuellesAttribut = document.querySelector(`.${styles["karte-bearbeiten-gruppe"]} > div#${attribut} > div`)

//       const neuerWert = prompt(`Gib einen Neuen Wert für ${attribut.charAt(0).toUpperCase() + attribut.slice(1)} ein:`, aktuellesAttribut?.innerHTML)
      
//       if (neuerWert) {
//         /* Neuen Wert zuweisen und Frontend aktualisieren */
//         deck.cards[kartenIndexNum][attribut] = neuerWert

//         setDecks(decks)
//         onClickDeckAnzeigen(deckName)
//         onClickKarteBearbeiten(deckName, kartenIndex)

//         if (aktuellesAttribut) {
//           aktuellesAttribut.innerHTML = neuerWert
//         }
//       }
//     }
//   }
// }

export default Verwaltung