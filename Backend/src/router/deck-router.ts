import express from "express"
import { drizzle } from "drizzle-orm/mysql2"
import { and, eq } from "drizzle-orm"
import { decks, deckSchema } from "../db/schema/decks-schema"
import { users } from "../db/schema/users-schema"
import { number } from "zod"

export const router = express.Router()
router.use(express.json())
const db = drizzle(process.env.DATABASE_FILE!)

/**
 * ../decks/:username
 *  - Alle Decks eines Benutzers
 * @return {JSX.Element}
 */
router.get("/:user_name", async (req, res) => {
  const query = await db.select().from(decks).where(eq(decks.user_name, req.params.user_name))

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(query)
})

router.put("/:user_name/:id", async (req, res) => {
  const body = req.body
  
  const parseResult = deckSchema.safeParse(body)
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors })
    return
  }
  const validData = parseResult.data

  const validId = Number(req.params.id)
  if (isNaN(validId)) {
    res.status(400).json({ error: "Ungültige ID" })
    return
  }

  const [query] = await db
    .update(decks)
    .set(validData)
    .where(
      and(
        eq(decks.user_name, req.params.user_name),
        eq(decks.id, validId)
      )
    )
  
  if(query.affectedRows === 1) {
    res.status(200).json(validData)
  } else {
    res.status(404).send("No rows were affected!")
  }
})

router.post("/", async (req, res) => {
  const body = req.body;

  const parseResult = deckSchema.safeParse(body);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors })
    return;
  }
  const validData = parseResult.data

  const existing = await db
    .select()
    .from(decks)
    .where(and(eq(decks.name, validData.name), eq(decks.user_name, validData.user_name)));

  if (existing.length > 0) {
    res.status(409).json("Deck existiert bereits");
    return
  }

  const existingUser = await db.select().from(users).where(eq(users.name, validData.user_name));
  console.log("Benutzerprüfung:", existingUser);
  console.log("Neues Deck anlegen:", req.body);
  const [query] = await db.insert(decks).values(validData);
  
  const result = await db.select().from(decks).where(eq(decks.id, query.insertId));
  res.status(201).json(result[0]);
});

router.delete("/:user_name/:id", async (req, res) => {
  const params = req.params;

  const validId = Number(req.params.id)
  if (isNaN(validId)) {
    res.status(400).json({ error: "Ungültige ID" })
    return
  }

  try {
    const [query] = await db.delete(decks).where(and(eq(decks.id, validId), eq(decks.user_name, params.user_name)));
    
    if(query.affectedRows === 1) {
      res.status(200).send()
    } else {
      res.status(404).send("No rows were affected!")
    }
  } catch (err) {
    console.error("Fehler beim Löschen des Decks:", err);
    res.status(500).json("Serverfehler beim Löschen des Decks");
  }
});
