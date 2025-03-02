/*
  Default Decks zu Testzwecken angelegt
*/

let decks = [
  { 
    name: "Mathe", 
    cards: [
      { ausdruck: "Albert Einstein", definition: "Mathematiker" },
      { ausdruck: "Relationen", definition: "Keine Ahnung" }
    ] 
  },
  { 
    name: "Englisch", 
    cards: [
      { ausdruck: "Hello", definition: "Hallo" },
      { ausdruck: "Goodbye", definition: "Auf Wiedersehen" }
    ] 
  },
  { 
    name: "Deutsch", 
    cards: [
      { ausdruck: "Goethe", definition: "Dichter" },
      { ausdruck: "Schiller", definition: "Dichter" }
    ] 
  },
  { 
    name: "Physik", 
    cards: [
      { ausdruck: "Marie Curie", definition: "Physikerin" },
      { ausdruck: "ABC", definition: "Buchstaben" },
    ] 
  }
];

/*
  Wenn Decks im LocalStorage gespeichert sind, werden sie geladen,
  ansonsten werden die Default Decks verwendet
*/
export function getDeck(){
  const storedDeck = localStorage.getItem("decks")
  return storedDeck ? JSON.parse(storedDeck) : decks; 
}

/*
  - In jeder Komponente einen eigenen 'useState' verwenden, der mit getDecks() initialisiert werden soll (lokale Decks)
  - Wenn sich die lokalen Decks verändern, sollte diese Funktion dazu aufgerufen werden, um den localStorage auf neustem Stand zu halten
*/
export function setDecks(newDecks : typeof decks){
  decks = newDecks
  localStorage.setItem("decks", JSON.stringify(newDecks)); 
}