import "dotenv/config"
import express from "express"
import cors from "cors"
import { eq, and } from "drizzle-orm"
import { decks } from "./db/schema/decks-schema"
import { cards } from "./db/schema/cards-schema"
import { router as userRouter } from "./router/user-router"
import { router as deckRouter } from "./router/deck-router"
import { router as cardRouter } from "./router/card-router"

const databaseFile = process.env.DATABASE_FILE
if (!databaseFile) {
  throw new Error("DATABASE_FILE Umgebungsvariable ist nicht gesetzt!")
}

const app = express();
app.use(express.json()); 

const port = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())


app.use("/users", userRouter)
app.use("/decks", deckRouter)
app.use("/cards", cardRouter)

app.listen(port, () => {
  console.log("Server gestartet")
});

/*
app.get("/user", async (request, response) => {
  const nameParam = request.query.name as string | undefined;
  
  if(!nameParam) {
    response.status(400).json("Keinen Namen übergeben!");
    return;
  }

    const userList = await db.select().from(users).where(eq(users.name, nameParam));

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json(userList);
  });

  app.post("/user", async (request, response) => {
    console.log("POST /deck aufgerufen mit:", request.query);
    const nameParam = request.query.name as string | undefined;
    const passwordParam = request.query.password as string | undefined;

    if(!nameParam) {
      response.status(400).json("Keinen Namen übergeben!");
      return;
    }
    if(!passwordParam) {
      response.status(400).json("Kein Passwort übergeben!");
      return;
    }
    
    await db.insert(users).values({name: nameParam, password: passwordParam});

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(204);
  });

  app.put("/deck", async (request, response) => {
    const userName = request.query.user_name as string | undefined;
    const oldName = request.query.old_name as string | undefined;
    const newName = request.query.new_name as string | undefined;

    if(!userName || !oldName || !newName)
    {
      response.status(400).json("Benutzername oder Deckname fehlen"); 
      return;
    }
    try
    {
      const updated = await db
        .update(decks)
        .set({name: newName})
        .where(and(eq(decks.name, oldName), eq(decks.user_name, userName)));
      
      response.status(200).json("Deckname aktualisiert");
    }
    catch(error)
    {
      console.log(error);
      response.status(500).json("Fehler beim aktualisieren");
    }
  });

  app.delete("/deck", async (request, response) => {
    const userName = request.query.user_name as string | undefined;
    const deckName = request.query.deck_name as string | undefined;

    if(!userName || !deckName)
    {
      response.status(400).json("Benutzername oder Deckname fehlen");
      return;
    }

    try
    {
      await db.delete(decks)
        .where(and(eq(decks.name, deckName), eq(decks.user_name, userName)));
      response.status(200).json("Deck gelöscht");
      return;
    }
    
    catch(error)
    {
      console.log(error);
      response.status(500).json("Fehler beim löschen");
    }
  });

  app.put("/benutzer", async(request, response) => {
    const nameParam = request.query.name as string;
    const passwortParam = request.query.passwort as string | undefined;

    if(!passwortParam)
    {
      response.status(400).json("Kein Passwort übergeben");
      return;
    }

    try{
      await db
      .update(users)
      .set({password: passwortParam})
      .where(eq(users.name, nameParam));

      response.status(200).json("Passwort aktualisiert");
    }
    catch(error)
    {
      response.status(500).json("Fehler beim aktualisieren")
    }
  });

  app.get("/decks", async (request, response) => {
    const userParam = request.query.user_name as string | undefined;
    
    if(userParam) {
      const decksList = await db.select().from(decks).where(eq(decks.user_name, userParam));
      response.status(200).json(decksList);
    } else {
      response.status(400).json("Keinen Benutzer-Namen übergeben!");
    }
  });

  app.get("/decks/names", async (request, response) => {
    const nameParam = request.query.user_name as string | undefined

    if (!nameParam) {
      response.status(400).json("Keinen Namen übergeben!");
      return;
    }
    let deckNamesList = await db.select({name: decks.name}).from(decks).where(eq(decks.user_name, nameParam));
    const namesList = deckNamesList.map(deck => {
      console.log(deck)
      console.log(deck.name)
      return deck.name
    })

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json(namesList);
  });

  app.get("/deck", async (request, response) => {
    const userNameParam = request.query.user_name as string | undefined
    const deckNameParam = request.query.deck_name as string | undefined
    
    if(!userNameParam) {
      response.status(400).json("Keinen Benutzer-Namen übergeben!")
      return
    }   
    if(!deckNameParam) {
      response.status(400).json("Keinen Deck-Namen überrgeben!")
      return
    }

    const decksList = await db.select().from(decks).where(
      and(
        eq(decks.user_name, userNameParam), 
        eq(decks.name, deckNameParam)
      )
    )

    if (decksList.length === 0) {
      response.status(404).json("Deck nicht gefunden")
      return
    }

    response.status(200).json(decksList[0])
  })

  app.post("/deck", async (request, response) => {
    const userNameParam = request.query.user_name as string | undefined
    const deckNameParam = request.query.deck_name as string | undefined
    

    if(!userNameParam) {
      response.status(400).json("Keinen Usernamen übergeben!");
      return;
    }
    if(!deckNameParam) {
      response.status(400).json("Keinen Decknamen übergeben!");
      return;
    }

    const decksList = await db.select().from(decks).where(
      and(
        eq(decks.user_name, userNameParam), 
        eq(decks.name, deckNameParam)
      )
    )

    if (decksList.length > 0) {
      response.status(409).json("Deck existiert für diesen User bereits, nicht hinzugefügt")
      return
    }
    
    await db.insert(decks).values({user_name: userNameParam, name: deckNameParam});
    const newEntries = await db.select().from(decks).where(
      and(
        eq(decks.user_name, userNameParam), 
        eq(decks.name, deckNameParam)
      )
    )

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json(newEntries[0]);
  })

  app.get("/cards", async (request, response) => {
    const deckParam = request.query.deck_id as number | undefined;
    
    if(deckParam) {
      const cardsList = await db.select().from(cards).where(eq(cards.deck_id, deckParam));
      response.status(200).json(cardsList);
    } else {
      response.status(400).json("Keine Deck-ID übergeben!");
    }
  });

  app.post("/card", async (request, response) => {
    const termParam = request.query.term as string | undefined
    const definitionParam = request.query.definition as string | undefined
    const weightParam = request.query.weight as number | undefined  
    const deck_idParam = request.query.deck_id as number | undefined

    if(!termParam) {
      response.status(400).json("Keinen Term übergeben!");
      return;
    }
    if(!definitionParam) {
      response.status(400).json("Keine Definition übergeben!");
      return;
    }
    if(!weightParam) {
      response.status(400).json("Kein Gewicht übergeben!");
      return;
    }
    if(!deck_idParam) {
      response.status(400).json("Keinen Deck-ID übergeben!");
      return;
    }

    const decksList = await db.select().from(cards).where(
      and(
        eq(cards.term, termParam), 
        eq(cards.definition, definitionParam), 
        eq(cards.weight, weightParam), 
        eq(cards.deck_id, deck_idParam)
      )
    )

    if (decksList.length > 0) {
      response.status(409).json("Karte existiert in diesem Deck für diesen User bereits, nicht hinzugefügt")
      return
    }
    
    await db.insert(cards).values({term: termParam, definition: definitionParam, weight: weightParam, deck_id: deck_idParam});
    const newEntries = await db.select().from(cards).where(
      and(
        eq(cards.term, termParam), 
        eq(cards.definition, definitionParam), 
        eq(cards.weight, weightParam), 
        eq(cards.deck_id, deck_idParam)
      )
    )

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(200).json(newEntries[0]);
})
*/