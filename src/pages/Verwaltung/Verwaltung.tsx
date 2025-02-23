import React, { useState } from "react";
import styles from "./Verwaltung.module.css";

function Verwaltung(){
  
  const [decks, setDecks] = useState([ // temporary dummy data
    {name: "Deck 1", color: "#3a9147", cards: [
      {title: "Satz des Pythagoras", front: "a^2 + b^2 = c^2", back: "root(a^2 + b^2) = c"}, 
      {title: "Satz des Pythagorasdasdsadadadadsadsadad2dadasdadsadsadsadasdasd saddowe9f843873f7f8 fs87 f7s8df78gsdf7g sdg7f7g8fg7s8 7gdsg7f 7g7gfd", front: "a^2 + b^2 = c^", back: "root(a^2 + b^2) = csadsadasdasdsadasdsadsadasdsada"}, 
      {title: "Titel 1", front: "Vorderseite 1", back: "Rückseite 1"}
    ]},
    {name: "Deck 2", color: "#320147", cards: [
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"},
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"},
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"},
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"}, 
      {title: "Titel 2", front: "Vorderseite 2", back: "Rückseite 2"},
    ]},
    {name: "Deck 3", color: "#420147", cards: [
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}, 
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}, 
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}, 
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}, 
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}, 
      {title: "Titel 3", front: "Vorderseite 3", back: "Rückseite 3"}
    ]},
    {name: "Deck 4", color: "#520147", cards: [
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}, 
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}, 
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}, 
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}, 
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}, 
      {title: "Titel 4", front: "Vorderseite 4", back: "Rückseite 4"}
    ]},
    {name: "Deck 5", color: "#620147", cards: [
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}, 
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}, 
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}, 
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}, 
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}, 
      {title: "Titel 5", front: "Vorderseite 5", back: "Rückseite 5"}
    ]},
    {name: "Deck 6", color: "#620147", cards: [
      {front: "Vorderseite 6", back: "Rückseite 6"},
      {front: "Vorderseite 6", back: "Rückseite 6"},
    ]},
    {name: "Deck 7", color: "#620147", cards: [
      {title: "Titel 7", front: "Vorderseite 7", back: "Rückseite 7"},
      {title: "Titel 7", front: "Vorderseite 7", back: "Rückseite 7"},
    ]},
    {name: "Deck 8", color: "#620147", cards: [
      {title: "Titel 8", front: "Vorderseite 8", back: "Rückseite 8"},
      {title: "Titel 8", front: "Vorderseite 8", back: "Rückseite 8"},
    ]},
    {name: "Deck 9", color: "#620147", cards: [
      {title: "Titel 9", front: "Vorderseite 9", back: "Rückseite 9"},
      {title: "Titel 9", front: "Vorderseite 9", back: "Rückseite 9"},
    ]},
    {name: "Deck 10", color: "#620147", cards: [
      {title: "Titel 10", front: "Vorderseite 10", back: "Rückseite 10"},
      {title: "Titel 10", front: "Vorderseite 10", back: "Rückseite 10"},
    ]}
  ])

  return (
    <>
      <div className={styles["verwaltung-rahmen"]}>
        <div className={styles["verwaltung-decks-liste"]}>
          {decks.map((deck, index) => (
            <div onClick={() => onClickDeck(deck.name, deck.cards)} key={index}>
              {deck.name}
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
                  {/* Wird später mit Karten gefüllt */}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`${styles["verwaltung-karte-bearbeiten-rahmen"]} ${styles["hide"]}`}>
            <h3>Karteikarte bearbeiten:</h3>
            {/* Wird später mit Infos der Karteikarte gefüllt */}
          </div>
        </div>
      </div>
    </>
  );
}

function onClickDeck(deckName: string, cards: {title?: string, front: string, back: string}[]) {
  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} table tbody`);
  
  /* Neue Tabellenzeilen erstellen */
  if (kartenListeElement) {
    kartenListeElement.setAttribute("deck", deckName);
    kartenListeElement.innerHTML = cards.map((card, index) => `
      <tr key=${index}>
        <td>${card.title || card.front}</td>
        <td>${card.back}</td>
        <td><button>X</button></td>
      </tr>
    `).join("");

    const rows = kartenListeElement.querySelectorAll("tr");
    rows.forEach((row, index) => {
      const key = row.attributes.getNamedItem("key")?.value;
      const button = row.querySelector("button");
      
      button?.addEventListener("click", () => onClickKarteEntfernen(key));
      row?.addEventListener("click", () => onClickKarteBearbeiten(key, {title: cards[index].title, front: cards[index].front, back: cards[index].back}));
    });
  }
}

function onInputSuche(event : React.FormEvent<HTMLInputElement>) {
  const target = event.target as HTMLInputElement;
  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} table tbody`);
  const searchValue = target.value;

  const cards = kartenListeElement?.querySelectorAll("tr");
  cards?.forEach(card => {
    /* Wenn die Infos der Karte Teile des Suchbegriffs enthalten, wird sie angezeigt, ansonsten ausgeblendet */
    const kartenInhalt = Array.from(card.querySelectorAll("td")).map(td => td.textContent).join(" ");
    
    if (kartenInhalt.toLowerCase().includes(searchValue.toLowerCase())) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function onClickKarteEntfernen(index: string | undefined) {
  const kartenListeElement = document.querySelector(`.${styles["verwaltung-deck-karten-liste"]} table tbody`)

  /* Überprüfen, ob ein gültiger index gefunden wurde und ob der Nutzer die Karteikarte wirklich löschen möchte */
  if (index && window.confirm("Möchtest Du diese Karteikarte wirklich löschen?")) {
    kartenListeElement?.querySelector(`tr[key="${index}"]`)?.remove();
  }
}

function onClickKarteBearbeiten(index: string | undefined, card: {title?: string, front: string, back: string}) {
  const rahmenKlassen = document.querySelector(`.${styles["verwaltung-karte-bearbeiten-rahmen"]}`)?.classList;
  rahmenKlassen?.remove(styles["hide"])

  document.querySelector(`.${styles["verwaltung-deck-karten-uebersicht"]}`)?.classList.add(styles["bearbeiten-ausgeklappt"]);


  const bVorderseiteElement = document.querySelector(`div#bearbeiten-vorderseite div`)
  const bRueckseiteElement = document.querySelector(`div#bearbeiten-rueckseite div`)
  const bErstellungsdatumElement = document.querySelector(`div#bearbeiten-erstellungsdatum div`)
  
  /* Daten in das Bearbeitungsfeld eintragen */
  // #TODO Für alle Elemente der Karteikarte ein Feld erstellen
  if(bVorderseiteElement) {
    bVorderseiteElement.innerHTML = (`
      ${card.front}
    `);
  }
  if(bRueckseiteElement) {
    bRueckseiteElement.innerHTML = (`
      ${card.back}
    `);
  }
  if(bErstellungsdatumElement) {
    bErstellungsdatumElement.innerHTML = (`
      ${new Date().toLocaleDateString()}
    `);
  }
}

export default Verwaltung