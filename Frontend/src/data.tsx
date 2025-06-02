import { User, Deck } from "./types";

// const url = "https://flashcards-3swd.onrender.com";
const url = "http://localhost:4000"

export function setData(dataParam: User[]) {
  localStorage.setItem("loginData", JSON.stringify(dataParam));
}

export async function getUser(username: string): Promise<User | undefined> {
  try {
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json");
    
    const request: RequestInfo = new Request(`${url}/user?name=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    })

    const result = await fetch(request)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
        }
        
        const user = await response.json();
        return user[0];
      })
      .catch(error => {
        console.error("Fehler beim Abfragen des Benutzers:", error);
        return undefined;
      });

    return result
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error);
    return undefined;
  }
}

export function addUser(user: User): void {
  try {
    const headers: Headers = new Headers();

    const request: RequestInfo = new Request(`${url}/user?name=${encodeURIComponent(user.name)}&password=${encodeURIComponent(user.password)}`, {
      method: 'POST',
      headers: headers
    })

    fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("Fehler beim Hinzufügen des Benutzers:", error);
      });
  } catch(error) {
    console.error("Fehler bei der Abfrage:", error);
  }
}

export async function getDeck(deckname: string): Promise<Deck | undefined> {
  try{
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    const username = localStorage.getItem("user") || ""
    
    const request: RequestInfo = new Request(`${url}/deck?user_name=${encodeURIComponent(username)}&deck_name=${encodeURIComponent(deckname)}`, {
      method: 'GET',
      headers: headers
    })
    
    let result = undefined
    const response = await fetch(request)
    try {
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
      }
      result = await response.json()
    } catch(error) {
      console.error("Fehler beim Abfragen der Decknamen:", error);
    }
    return result

  } catch(error) {
    console.error("Fehler bei der Abfrage:", error);
    return undefined;
  }
}

export function addDeck(deck: Deck): void {
  
}

export async function getDeckNames(): Promise<string[]> {
  try{
    const headers: Headers = new Headers()
    headers.set("Accept", "application/json")
    
    const username = localStorage.getItem("user") || ""
    
    const request: RequestInfo = new Request(`${url}/decks/names?user=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: headers
    })
    
    let result = []
    const response = await fetch(request)
    try {
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
      }
      result = await response.json()
    } catch(error) {
      console.error("Fehler beim Abfragen der Decknamen:", error);
    }
    return result 

  } catch(error) {
    console.error("Fehler bei der Abfrage:", error);
    return [];
  }
}