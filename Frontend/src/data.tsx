import { User, Deck, Card } from "./types"

const url = "http://localhost:4000"//"https://flashcards-3swd.onrender.com"

// NEUE FUNKTIONEN:

export async function getUser(username: string): Promise<User | undefined> {
  try {
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    const request: RequestInfo = new Request(`${url}/users/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    })

    const result = await fetch(request)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
        }
        
        const user = await response.json()
        return user[0]
      })
      .catch(error => {
        console.error("Fehler beim Abfragen des Benutzers:", error)
        return undefined
      })

    return result
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
    return undefined
  }
}

export function addUser(user: User): void {
  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")

    const request: RequestInfo = new Request(`${url}/users`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    })

    fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error("Fehler beim Hinzufügen des Benutzers:", error)
      })
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
  }
}

export async function getDeck(deckname: string, username?: string): Promise<Deck & {id: number} | undefined> {
  try{
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    username = username || localStorage.getItem("user") || "default"
    
    const request: RequestInfo = new Request(`${url}/deck?user_name=${encodeURIComponent(username)}&deck_name=${encodeURIComponent(deckname)}`, {
      method: 'GET',
      headers: headers
    })
    
    let result = undefined
    const response = await fetch(request)
    try {
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
      }
      result = await response.json()
    } catch(error) {
      console.error("Fehler beim Abfragen des Decks:", error)
    }
    return result

  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
    return undefined
  }
}

export async function addDeck(deck: {name: string, user: string}): Promise<{id: number, name: string, user: string} | undefined> {
  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")

    const request = new Request(`${url}/decks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(deck)
    })

    const response = await fetch(request)
    let result = undefined

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 409) {
        console.warn("Deck bereits vorhanden.");
        return result;
      }
      throw new Error(`Fehler beim Anlegen des Decks: ${response.status} ${response.statusText} – ${errorText}`);
    }

    result = await response.json();
    return result;

  } catch(error) {
    console.error("Fehler beim Hinzufügen des Decks:", error);
    return undefined;
  }
}


export async function addDeckWithCards(deck: Deck): Promise<void> {
  console.log("addDeckWithCards aufgerufen für:", deck);
  const {cards, ...deckWithoutCards} = deck
  let addedDeck = await addDeck(deckWithoutCards)
  if (!addedDeck) {
    addedDeck = await getDeck(deck.name, deck.user)
  if (!addedDeck) {
    console.error("neu angelegtes Deck nicht gefunden")
    return
    }
  }
  console.log("neu angelegtes deck gefunden, füge karten hinzu")
  const deckId: number = addedDeck.id

  for (let card of cards) {
    addCard(card, deckId)
  }
}

export async function getDeckNames(): Promise<string[]> {
  try {
    const headers: Headers = new Headers();
    headers.set("Accept", "application/json");

    const username = localStorage.getItem("user") || "";

    const request: RequestInfo = new Request(`${url}/decks/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
    }

    const raw = await response.json();

    const result = raw.map((entry: { name: string }) => entry.name);

    return result;
  } catch (error) {
    console.error("Fehler bei der Abfrage der Decknamen:", error);
    return [];
  }
}

export async function getCards(username: string, deckname: string): Promise<(Card & {id: number, deck_id: number})[] | undefined> {
  try{
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    const request = new Request(`${url}/cards/${encodeURIComponent(username)}/${encodeURIComponent(deckname)}`, {
      method: 'GET',
      headers
    })
    
    let result = []
    const response = await fetch(request)
    try {
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
      }
      result = await response.json()
    } catch(error) {
      console.error("Fehler beim Abfragen der Karten:", error)
    }
    return result 

  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
    return []
  }
}

export async function addCard(card: Card, deck_id: number): Promise<{id: number, term: string, definition: string, weight: number, deck_id: number} | undefined> {
  try {
    const headers: Headers = new Headers()

    const request: RequestInfo = new Request(`${url}/card?term=${encodeURIComponent(card.term)}&definition=${encodeURIComponent(card.definition)}&weight=${encodeURIComponent(card.weight)}&deck_id=${encodeURIComponent(deck_id)}`, {
      method: 'POST',
      headers: headers
    })

    let result = undefined
    const response = await fetch(request)
    try {
      if (!response.ok) {
        if (response.status === 409) {
          return result
        }
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
      }
      result = await response.json()
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Karte:", error)
    }
    return result

  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
  }
}

/*
export function setData(dataParam: User[]) {
  localStorage.setItem("loginData", JSON.stringify(dataParam))
}











}
*/