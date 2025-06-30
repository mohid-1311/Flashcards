import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { and, eq } from "drizzle-orm"
import { decks, deleteDeckSchema } from "../db/schema/decks-schema"
import { users } from "../db/schema/users-schema"
import { z } from "zod"
import { deckSchema } from "../db/schema/decks-schema"

export const router = express.Router()
router.use(express.json())
const db = drizzle(process.env.DATABASE_FILE!)

/**
 * ../decks/:username
 *  - Alle Decks eines Benutzers
 * @return {JSX.Element}
 */
router.get("/:username", async (request, response) => {
  const query = await db.select().from(decks).where(eq(decks.user_name, request.params.username))

  response.setHeader("Content-Type", "application/json")
  response.status(200).json(query)
})

router.post("/", async (req, res) => {
  const { name, user } = req.body;

  const parseResult = deckSchema.safeParse({ name, user_name: user });
  
  if (!parseResult.success) {
    res.status(400).json("Deckname oder Benutzername fehlen");
    return;
  }

  const existing = await db
    .select()
    .from(decks)
    .where(and(eq(decks.name, name), eq(decks.user_name, user)));

  if (existing.length > 0) {
    res.status(409).json("Deck existiert bereits");
    return
  }

  const existingUser = await db.select().from(users).where(eq(users.name, user));
  console.log("Benutzerprüfung:", existingUser);
  console.log("Neues Deck anlegen:", req.body);
  const result = await db.insert(decks).values({ name, user_name: user }).returning();
  res.status(201).json(result[0]);
});

router.delete("/:username/:deckname", async (req, res) => {
  const { username, deckname } = req.params;

  const result = deleteDeckSchema.safeParse({ name: deckname, user_name: username });
  if (!result.success) {
    res.status(400).json("Ungültiger Deckname oder Benutzername");
    return;
  }

  try {
    const existing = await db
      .select()
      .from(decks)
      .where(and(eq(decks.name, deckname), eq(decks.user_name, username)));

    if (existing.length === 0) {
      res.status(404).json("Deck nicht gefunden oder gehört nicht dem Benutzer");
      return;
    }

    await db.delete(decks).where(and(eq(decks.name, deckname), eq(decks.user_name, username)));
    res.status(204).send();
  } catch (err) {
    console.error("Fehler beim Löschen des Decks:", err);
    res.status(500).json("Serverfehler beim Löschen des Decks");
  }
});


