import "dotenv/config";
import express from "express";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { benutzer } from "./db/schema/benutzer";
import { decks } from "./db/schema/decks";
import { karteikarten } from "./db/schema/karteikarten";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const app = express();
const db = drizzle(databaseUrl);
app.get("/benutzer", async (request, response) => {
  const benutzerListe = await db.select().from(benutzer);
  response.json(benutzerListe);
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
