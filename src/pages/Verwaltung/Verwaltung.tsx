import React from "react"
import styles from "./Verwaltung.module.css"
import { getDeck, setDecks } from "../../deckState"

type KarteikartenAttribute = "ausdruck" | "definition"

let decks: {name: string, cards: {ausdruck: string, definition: string}[]}[]

function Verwaltung(){
  decks = getDeck()

  return (
    <>
      <div className={styles["verwaltung-rahmen"]}>
        <div className={styles["verwaltung-decks-liste"]}>
          <div>
            +
          </div>
          {decks.map((deck: {name: string, cards: {ausdruck: string, definition: string}[]}, index: number) => (
            <div onClick={() => onClickDeck(deck.name)} key={index}>
              {deck.name}
              <button className={styles["verwaltung-deck-entfernen"]}>X</button>
            </div>
          ))}
        </div>
        <div className={styles["verwaltung-deck-karten-rahmen"]}>
          <div className={styles["verwaltung-deck-karten-uebersicht"]}>
            <div className={styles["verwaltung-deck-karten-suche"]}>
              <input type="text" placeholder="Karteikarten durchsuchen..." onInput={onInputSuche}/>
            </div>
            <div className={styles["verwaltung-deck-karten-liste"]}>
              <table>
                <tbody>
                  {/* Wird später mit Karteikarten gefüllt */}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${styles["verwaltung-karte-bearbeiten-rahmen"]} ${styles["verstecken"]}`}>
            {/* Wird später mit Infos der Karteikarte gefüllt */}
          </div>
        </div>
      </div>
    </>
  )
}

function onClickDeck(deckName: string) {
  /* Karte-Bearbeiten Feld verstecken */
  document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)?.classList.add(styles["verstecken"])
  document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

  /* Wenn ein Deck existiert, dieses laden */
  const deck = decks.find(deck => deck.name === deckName)
  if(!deck) return

  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} > table > tbody`)
  
  /* Neue Tabellenzeilen erstellen */
  if (kartenListeElement) {
    kartenListeElement.setAttribute("deckName", deckName)
    kartenListeElement.innerHTML =
    (`
      <tr id="karte-hinzufuegen">
        <td></td>
        <td>+</td>
        <td></td>
      </tr>
    `) 
    +
    deck.cards.map((card, index) => `
      <tr key=${index}>
        <td>${card.ausdruck}</td>
        <td>${card.definition}</td>
        <td><button class=${styles["verwaltung-karte-entfernen"]} id="karten-liste-karte-entfernen-button">X</button></td>
      </tr>
    `).join("")

    const reihen = kartenListeElement.querySelectorAll("tr")
    reihen.forEach((reihe, index) => {
      const key = reihe.attributes.getNamedItem("key")?.value
      
      if (key) {
        reihe?.addEventListener("click", (event) => onClickReihe(event, deckName, key))
      } else {
        reihe?.addEventListener("click", () => onClickKarteHinzufuegenInput(deckName))
      }
    })

    /* Element mit dem aktuellen Wert der Suchleiste abrufen */
    const suchleisteElement = (document.querySelector(`.${styles["verwaltung-deck-karten-suche"]} > input`) as HTMLInputElement)
    if(!suchleisteElement) return
    const suchleisteWert = suchleisteElement.value

    if(suchleisteWert) {
      onInputSuche()
    }
  }
}

function onInputSuche() {
  /* Karte-Bearbeiten Feld verstecken */
  document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)?.classList.add(styles["verstecken"])
  document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

  /* Element mit dem aktuellen Wert der Suchleiste abrufen */
  const suchleisteElement = (document.querySelector(`.${styles["verwaltung-deck-karten-suche"]} > input`) as HTMLInputElement)
  if(!suchleisteElement) return
  const suchleisteWert = suchleisteElement.value
  
  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} > table > tbody`)
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

function onClickReihe(event : MouseEvent, deckName : string, kartenIndex: string) {
  /* Wenn ein Deck existiert, dieses mit Karten laden */
  const deck = decks.find(deck => deck.name === deckName)
  if(!deck) return

  const card = deck.cards.find((_, index) => index.toString() === kartenIndex)
  if(!card) return

  const targetElement = event.target as HTMLElement
  console.log(targetElement.id)
  if (targetElement.id === "karten-liste-karte-entfernen-button") {
    onClickKarteEntfernen(deckName, kartenIndex)
  } else {
    onClickKarteBearbeiten(deckName, kartenIndex)
  }
}

function onClickKarteEntfernen(deckName : string, kartenIndex: string) {
  /* Karte-Bearbeiten Feld verstecken */
  document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)?.classList.add(styles["verstecken"])
  document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} > table > tbody`)

  /* Überprüfen, ob ein gültiger Index gefunden wurde und ob der Nutzer die Karteikarte wirklich löschen möchte */
  if (kartenIndex && window.confirm("Möchtest Du diese Karteikarte wirklich löschen?")) {
    const deck = decks.find(deck => deck.name === deckName)

    if (deck) {
      const kartenIndexNum = deck.cards.findIndex((_, index) => index.toString() === kartenIndex)
      
      if (kartenIndexNum !== -1) {
        /* Karte löschen und Frontend aktualisieren */
        deck.cards.splice(kartenIndexNum, 1)

        setDecks(decks)
        onClickDeck(deckName)
      }
    }
  }
}

function onClickKarteBearbeiten(deckName : string, kartenIndex: string) {
  /* Karteikarte aus deckName und kartenIndex raussuchen, falls nicht vorhanden, abbrechen */
  const card = decks.find(deck => deck.name === deckName)?.cards.find((_, index) => index.toString() === kartenIndex)
  if(!card) return

  const rahmenElement = document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)

  /* Daten in das Bearbeitungsfeld eintragen */
  if(rahmenElement) {
    rahmenElement.classList.remove(styles["verstecken"])

    document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.add(styles["bearbeiten-ausgeklappt"])
    
    rahmenElement.innerHTML = (`
      <h3>Karteikarte bearbeiten:</h3>
      <div id="ausdruck">
        <h4>Ausdruck:<button class=${styles["verwaltung-karte-bearbeiten-attribut"]}>✏️</button></h4>
        <div>${card.ausdruck}</div>
      </div>
      <div id="definition">
        <h4>Definition:<button class=${styles["verwaltung-karte-bearbeiten-attribut"]}>✏️</button></h4>
        <div>${card.definition}</div>
      </div>
    `)

    rahmenElement.querySelectorAll(`.${styles["verwaltung-karte-bearbeiten-attribut"]}`).forEach(buttonElement => {
      const attributeName = (buttonElement.parentElement?.parentElement?.id as KarteikartenAttribute)
      buttonElement.addEventListener("click", () => onClickAttributBearbeiten(deckName, kartenIndex, attributeName))
    })
  }
}

function onClickKarteHinzufuegenInput(deckName : string) {
  /* Karte-Bearbeiten Feld verstecken */
  document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)?.classList.add(styles["verstecken"])
  document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.remove(styles["bearbeiten-ausgeklappt"])

  const neueKarteElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} > table > tbody > tr#karte-hinzufuegen`)
  
  if(neueKarteElement) {
    if(!neueKarteElement.querySelector("td")?.innerHTML) {

      neueKarteElement.innerHTML = (`
        <td><input type="text" placeholder="Ausdruck eingeben..." required class=${styles["verwaltung-karte-hinzufuegen"]} id="ausdruck" /></td>
        <td><input type="text" placeholder="Definition eingeben..." required class=${styles["verwaltung-karte-hinzufuegen"]} id="definition" /></td>
        <td><button class=${styles["verwaltung-karte-hinzufuegen"]}>+</button></td>
      `)
      
      neueKarteElement.querySelector("td > button")?.addEventListener("click", () => onClickKarteHinzufuegen(deckName))
    }
  }
}

function onClickKarteHinzufuegen(deckName: string) {
  const neueKarteElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} > table > tbody > tr#karte-hinzufuegen`)
  
  if(neueKarteElement) {
    /* Alle Inputs einlesen und überprüfen, ob für alle Inputs ein Wert eingegeben wurde */
    let attribute: { [key: string]: string } = {}
    let attributeCount = 0

    Array.from(neueKarteElement.querySelectorAll("td > input")).forEach(attributInputElement => {
      if((attributInputElement as HTMLInputElement).value.length > 0) {
        attribute[attributInputElement.id] = (attributInputElement as HTMLInputElement).value
        attributeCount++
      }
    })

    if(attributeCount === neueKarteElement.querySelectorAll("td > input").length) {
      const deck = decks.find(deck => deck.name === deckName)
      
      if (deck) {
        deck.cards.push({ ausdruck: attribute["ausdruck"], definition: attribute["definition"] })
        setDecks(decks)
        onClickDeck(deckName)
      }
    }
  }
}

function onClickAttributBearbeiten(deckName: string, kartenIndex : string, attribut : KarteikartenAttribute) {
  const deck = decks.find(deck => deck.name === deckName)

  if (deck) {
    const kartenIndexNum = deck.cards.findIndex((_, index) => index.toString() === kartenIndex)
    
    if (kartenIndexNum !== -1) {
      const aktuellesAttribut = document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]} > div#${attribut} > div`)

      const neuerWert = prompt(`Gib einen Neuen Wert für ${attribut.charAt(0).toUpperCase() + attribut.slice(1)} ein:`, aktuellesAttribut?.innerHTML)
      
      if (neuerWert) {
        /* Neuen Wert zuweisen und Frontend aktualisieren */
        deck.cards[kartenIndexNum][attribut] = neuerWert

        setDecks(decks)
        onClickDeck(deckName)
        onClickKarteBearbeiten(deckName, kartenIndex)

        if (aktuellesAttribut) {
          aktuellesAttribut.innerHTML = neuerWert
        }
      }
    }
  }
}

export default Verwaltung