import "dotenv/config";
import express from "express";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { benutzer } from "./db/schema/benutzer";
import { decks } from "./db/schema/decks";
import { karteikarten } from "./db/schema/karteikarten";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL Umgebungsvariable ist nicht gesetzt!");
}

const app = express();
const db = drizzle(databaseUrl);

app.get("/benutzer", async (request, response) => {
  const nameParam = request.query.name as string | undefined;
  
  if(!nameParam) {
    response.status(400).json("Keinen Namen übergeben!");
    return;
  }

  const benutzerListe = await db.select().from(benutzer).where(eq(benutzer.name, nameParam));

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(200).json(benutzerListe);
});

app.post("/benutzer", async (request, response) => {
  const nameParam = request.query.name as string | undefined;
  const passwortParam = request.query.passwort as string | undefined;

  if(!nameParam) {
    response.status(400).json("Keinen Namen übergeben!");
    return;
  }
  if(!passwortParam) {
    response.status(400).json("Kein Passwort übergeben!");
    return;
  }
  
  await db.insert(benutzer).values({name: nameParam, passwort: passwortParam});

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(204);
});

app.get("/decks", async (request, response) => {
  const benutzerParam = request.query.benutzer_name as string | undefined;
  
  if(benutzerParam) {
    const decksListe = await db.select().from(decks).where(eq(decks.benutzer_name, benutzerParam));
    response.status(200).json(decksListe);
  } else {
    response.status(400).json("Keinen Benutzer-Namen übergeben!");
  }
});

app.get("/karteikarten", async (request, response) => {
  const deckParam = request.query.deck_id as number | undefined;
  
  if(deckParam) {
    const karteikartenListe = await db.select().from(karteikarten).where(eq(karteikarten.deck_id, deckParam));
    response.status(200).json(karteikartenListe);
  } else {
    response.status(400).json("Keine Deck-ID übergeben!");
  }
});

app.listen(90, () => {
  console.log("Server gestartet");
});
