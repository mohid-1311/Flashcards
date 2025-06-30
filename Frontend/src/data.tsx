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

export async function getDeck(deckname: string, username?: string): Promise<(Deck & { id: number }) | undefined> {
  try {
    const headers: Headers = new Headers();
    headers.set("Accept", "application/json");

    username = username || localStorage.getItem("user") || "default";

    const request: RequestInfo = new Request(`${url}/decks/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
    }

    const decks = await response.json();

    const deck = decks.find((d: Deck & { id: number }) => d.name === deckname);

    return deck;
  } catch (error) {
    console.error("Fehler beim Abfragen des Decks:", error);
    return undefined;
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

export async function addCard(card: Card, deck_id: number): Promise<any> {
  try {
    const response = await fetch("http://localhost:4000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        term: card.term,
        definition: card.definition,
        weight: card.weight,
        deck_id: deck_id
      })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Karte:", error);
    return undefined;
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


export async function updateDeck(deckName: string, newDeckName: string): Promise<boolean> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")
  
  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    
    const request: RequestInfo = new Request(`${url}/decks/${encodeURIComponent(username)}/${encodeURIComponent(deckName)}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({name: newDeckName, user_name: username})
    })

    const response = await fetch(request)
      .then(response => {
        if (!response.ok) {
          response.text().then(text => {
            if (text) {
              console.error("Error message from server:", text)
            }
          })
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .catch(error => {
        console.error("Fehler beim Bearbeiten des Decks:", error)
      })
      
    if(response && response.name === newDeckName && response.user_name === username) {
      return true
    }
    
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
  }

  return false
}

//================================================================================================================
/*
export function setData(dataParam: User[]) {
  localStorage.setItem("loginData", JSON.stringify(dataParam))
}

export async function getUser(username: string): Promise<User | undefined> {





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







export async function deleteCard(cardId: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:4000/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) 
    {
      const errorText = await response.text();
      throw new Error(`Fehler beim Löschen der Karte: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return true;
  } 
  
  catch (error) 
  {
    console.error("Fehler beim Löschen der Karte:", error);
    return false;
  }
}

export async function deleteDeck(deckname: string, username?: string): Promise<boolean> {
  try {
    username = username || localStorage.getItem("user") || "default";

    const response = await fetch(`${url}/decks/${encodeURIComponent(username)}/${encodeURIComponent(deckname)}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fehler beim Löschen des Decks: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Fehler beim Löschen des Decks:", error);
    return false;
  }
}

/*
export function setData(dataParam: User[]) {
  localStorage.setItem("loginData", JSON.stringify(dataParam))
}











}
*/