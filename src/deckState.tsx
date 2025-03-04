
export interface Card {
  ausdruck: string;
  definition: string;
}

export interface Deck {
  name: string;
  cards: Card[];
}

/*
  Default Decks zu Testzwecken angelegt
*/


let decks = [
  { 
    name: "Mathe", 
    user: "Florian",
    cards: [
      { ausdruck: "Albert Einstein", definition: "Mathematiker" },
      { ausdruck: "Relationen", definition: "Keine Ahnung" }
    ] 
  },
  { 
    name: "Englisch", 
    user: "Mohid",
    cards: [
      { ausdruck: "Hello", definition: "Hallo" },
      { ausdruck: "Goodbye", definition: "Auf Wiedersehen" }
    ] 
  },
  { 
    name: "Deutsch", 
    user: "Mohid",
    cards: [
      { ausdruck: "Goethe", definition: "Dichter" },
      { ausdruck: "Schiller", definition: "Dichter" }
    ] 
  },
  { 
    name: "Physik", 
    user: "Moritz",
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
export function getDecks(){
  const storedDeck = localStorage.getItem("decks")
  const user = localStorage.getItem("user")?.toLowerCase()
  const allDecks = storedDeck ? JSON.parse(storedDeck) : decks; 
  return allDecks.filter((deck: Deck) => deck.user.toLowerCase() === user)
}

/*
  - In jeder Komponente einen eigenen 'useState' verwenden, der mit getDecks() initialisiert werden soll (lokale Decks)
  - Wenn sich die lokalen Decks verändern, sollte diese Funktion dazu aufgerufen werden, um den localStorage auf neustem Stand zu halten
*/
export function setDecks(newDecks : typeof decks){
  const user = localStorage.getItem("user")?.toLowerCase()
  for (let deck of newDecks) {
    if (!deck.user) {
      deck.user = user || "default" // default verhalten ist verbesserungswürdig
    }
  }
  decks = newDecks
  localStorage.setItem("decks", JSON.stringify(newDecks)); 
}

