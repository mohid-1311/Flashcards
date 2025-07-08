
export interface Card {
  term: string;
  definition: string;
  weight: number;
}

export interface Deck {
  name: string;
  user: string;
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
      { term: "Albert Einstein", definition: "Mathematiker", weight: 10},
      { term: "Relationen", definition: "Keine Ahnung", weight: 10 }
    ] 
  },
  { 
    name: "Englisch", 
    user: "Mohid",
    cards: [
      { term: "Hello", definition: "Hallo", weight: 10 },
      { term: "Goodbye", definition: "Auf Wiedersehen", weight: 10 }
    ] 
  },
  { 
    name: "Deutsch", 
    user: "Mohid",
    cards: [
      { term: "Goethe", definition: "Dichter", weight: 10 },
      { term: "Schiller", definition: "Dichter", weight: 10 }
    ] 
  },
  { 
    name: "Physik", 
    user: "Moritz",
    cards: [
      { term: "Marie Curie", definition: "Physikerin", weight: 10 },
      { term: "ABC", definition: "Buchstaben", weight: 10 },
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
/**
 * Setzt die decks Variable, lässt aber alle Decks von nicht angemeldeten Nutzern intakt
 * (so dass "setDecks(getDecks())" keinen Effekt hat)
 * @param newDecks zu Speichernde Decks des aktuellen Nutzers
 */
export function setDecks(newDecks : typeof decks){
  const user = localStorage.getItem("user")?.toLowerCase()
  if(user) {
    for (let deck of newDecks) {
      if (!deck.user) {
        deck.user = user
      }
    }
  }
  const oldDecks = decks.filter((deck: Deck) => deck.user.toLowerCase() !== user)
  decks = [...oldDecks, ...newDecks]
  localStorage.setItem("decks", JSON.stringify(decks)); 
}


