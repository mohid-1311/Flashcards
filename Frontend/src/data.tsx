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

