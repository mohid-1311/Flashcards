import { User, Deck, Card } from "./types"

const url = "http://localhost:4000"//"https://flashcards-3swd.onrender.com"

// NEUE FUNKTIONEN:

export async function updateDeck(deckId: number, newDeckName: string): Promise<boolean> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")
  
  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")
    
    const request: RequestInfo = new Request(`${url}/decks/${encodeURIComponent(username)}/${encodeURIComponent(deckId)}`, {
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
        throw new Error(`Fehler beim Bearbeiten des Decks: ${error}`);
      })
      
    if(response && response.name === newDeckName && response.user_name === username) {
      return true
    }
    return false
  } catch(error) {
    throw new Error(`Fehler bei der Abfrage: ${error}`);
  }
}

export async function getUser(username: string): Promise<User> {
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
    throw new Error(`Fehler beim Abfragen des Benutzers: ${error}`);
      })

    return result
  } catch(error) {
    throw new Error(`Fehler bei der Abfrage: ${error}`);
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
    throw new Error(`Fehler bei der Abfrage: ${error}`);
  }
}

export async function getDeck(deckId: number): Promise<Omit<Deck, "cards">> {
  const decks = await getDecks()

  const deck = decks.find((d: Omit<Deck, "cards">) => d.id === deckId)

  if(!deck) throw new Error(`Kein Deck mit der ID vorhanden!`)

  return deck;
}

export async function addDeck(deckName: string): Promise<Omit<Deck, "cards">> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")

  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")

    const request = new Request(`${url}/decks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: deckName, user_name: username })
    })

    const response = await fetch(request)
    let result = undefined

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error(`Deck ist bereits vorhanden: ${response.status} ${response.statusText}`);
      }
      throw new Error(`Fehler beim Anlegen des Decks: ${response.status} ${response.statusText}`);
    }
    result = await response.json();

    return result;
  } catch(error) {
    throw new Error(`Fehler beim Anlegen des Decks: ${error}`);
  }
}

export async function addDeckWithCards(deck: Deck): Promise<void> {
  console.log("addDeckWithCards aufgerufen für:", deck);
  let addedDeck = await addDeck(deck.name)
  if (!addedDeck) {
    addedDeck = await getDeck(deck.id)
  if (!addedDeck) {
    console.error("neu angelegtes Deck nicht gefunden")
    return
    }
  }
  console.log("neu angelegtes deck gefunden, füge karten hinzu")
  const deckId: number = addedDeck.id

  for (let card of deck.cards) {
    addCard(card, deckId)
  }
}

export async function getDecks(): Promise<Omit<Deck, "cards">[]> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")
    
  try {
    const headers: Headers = new Headers();
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(`${url}/decks/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
    }

    const raw = await response.json();

    return raw;
  } catch (error) {
    console.error("Fehler bei der Abfrage der Decknamen:", error);
    return [];
  }
}

export async function getCards(deckname: string): Promise<(Card & {deck_id: number})[]> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")

  try{
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    const request = new Request(`${url}/cards/${encodeURIComponent(username)}/${encodeURIComponent(deckname)}`, {
      method: 'GET',
      headers
    })
    
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status} ${response.statusText}`)
    }

    return await response.json() 
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error)
    return []
  }
}

export async function addCard(card: Omit<Card, "id">, deck_id: number): Promise<Card> {
  try {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")

    const response = await fetch(`${url}/cards`, {
      method: "POST",
      headers: headers,
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
    throw new Error(`Fehler beim Hinzufügen der Karte: ${error}`);
  }
}

export async function deleteCard(cardId: number): Promise<boolean> {
  try {
    const headers: Headers = new Headers()

    const response = await fetch(`${url}/cards/${cardId}`, {
      method: "DELETE",
      headers: headers
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

export async function deleteDeck(deckId: number): Promise<boolean> {
  const username = localStorage.getItem("user");
  if(!username) throw new Error("No user in local storage declared")

  try {
    const headers: Headers = new Headers()

    const response = await fetch(`${url}/decks/${encodeURIComponent(username)}/${encodeURIComponent(deckId)}`, {
      method: "DELETE",
      headers: headers
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

*/

export async function updateCard(username: string, deckname: string, cardId: number, paramsToUpdate: Partial<Omit<Card, "id" | "deck_id">>): Promise<boolean> {
  try {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const request = new Request(`${url}/cards/${encodeURIComponent(username)}/${encodeURIComponent(deckname)}/${cardId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(paramsToUpdate)
    })

    const response = await fetch(request);

    if (!response.ok) {
      console.error(`Fehler beim Aktualisieren der Karte: ${response.status} ${response.statusText}`);
      return false;
    }
    return true

  } catch (error) {
    console.error("Fehler bei der Anfrage:", error);
    return false;
  }
}

