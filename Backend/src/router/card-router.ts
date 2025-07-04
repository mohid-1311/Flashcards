import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { eq, and } from "drizzle-orm"
import { decks, deckSchema } from "../db/schema/decks-schema"
import { cards } from "../db/schema/cards-schema"
import { cardSchema } from "../db/schema/cards-schema"

export const router = express.Router()
router.use(express.json())
const db = drizzle(process.env.DATABASE_FILE!)

/**
 * ../cards/:username/:deckname
 *  - Alle Karten eines Decks eines Benutzers
 * @return {JSX.Element}
 */
router.get("/:user_name/:name", async (req, res) => {
  const params = req.params;

  const parseResult = deckSchema.safeParse(params);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors });
    return;
  }
  const validData = parseResult.data
  
  const query = await db
    .select({ cards: cards })
    .from(cards)
    .innerJoin(decks, eq(decks.id, cards.deck_id))
    .where(
      and(
        eq(decks.user_name, validData.user_name),
        eq(decks.name, validData.name)
      )
    )
  const cardsOnly = query.map((row) => row.cards)

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(cardsOnly)
})

router.post("/", async (req, res) => {
  const body = req.body;

  const parseResult = cardSchema.safeParse(body);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors });
    return;
  }
  const validData = parseResult.data

  try {
    const inserted = await db
      .insert(cards)
      .values(validData);

    res.status(201).json(inserted);
  } catch (err) {
    console.error("Fehler beim Hinzufügen der Karte:", err);
    res.status(500).json("Fehler beim Speichern der Karte");
  }
});

router.delete("/:cardid", async (req, res) => {
  const cardId = Number(req.params.cardid);

  if (isNaN(cardId)) {
    res.status(400).json({ error: "Ungültige Karten-ID" });
    return;
  }

  try {
    const deleted = await db
      .delete(cards)
      .where(eq(cards.id, cardId));

    if (deleted.rowsAffected === 0) {
      res.status(404).json({ error: "Karte nicht gefunden" });
      return;
    }

    res.status(200).json({ message: "Karte erfolgreich gelöscht" });
  } catch (err) {
    console.error("Fehler beim Löschen der Karte:", err);
    res.status(500).json({ error: "Fehler beim Löschen der Karte" });
  }
});