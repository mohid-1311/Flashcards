import "dotenv/config";
import express from "express";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { users } from "./db/schema/users";
import { decks } from "./db/schema/decks";
import { cards } from "./db/schema/cards";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL Umgebungsvariable ist nicht gesetzt!");
}

const app = express();
const port = process.env.PORT || 4000 
const db = drizzle(databaseUrl);

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

app.get("/decks", async (request, response) => {
  const userParam = request.query.user_name as string | undefined;
  
  if(userParam) {
    const decksList = await db.select().from(decks).where(eq(decks.user_name, userParam));
    response.status(200).json(decksList);
  } else {
    response.status(400).json("Keinen Benutzer-Namen übergeben!");
  }
});

app.get("/cards", async (request, response) => {
  const deckParam = request.query.deck_id as number | undefined;
  
  if(deckParam) {
    const cardsList = await db.select().from(cards).where(eq(cards.deck_id, deckParam));
    response.status(200).json(cardsList);
  } else {
    response.status(400).json("Keine Deck-ID übergeben!");
  }
});

app.listen(port, () => {
  console.log("Server gestartet");
});
