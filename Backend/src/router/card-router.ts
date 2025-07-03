import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { eq, and } from "drizzle-orm"
import { decks } from "../db/schema/decks-schema"
import { cards } from "../db/schema/cards-schema"
import { cardSchema } from "../db/schema/cards-schema"

export const router = express.Router()

const db = drizzle(process.env.DATABASE_FILE!)


/**
 * ../cards/:username/:deckname
 *  - Alle Karten eines Decks eines Benutzers
 * @return {JSX.Element}
 */
router.get("/:username/:deckname", async (request, response) => {
  const query = await db
    .select({ cards: cards })
    .from(cards)
    .innerJoin(decks, eq(decks.id, cards.deck_id))
    .where(
      and(
        eq(decks.user_name, request.params.username),
        eq(decks.name, request.params.deckname)
      )
    )
  const cardsOnly = query.map((row) => row.cards)

  response.setHeader("Content-Type", "application/json")
  response.status(200).json(cardsOnly)
})

router.post("/", async (req, res) => {
  const { term, definition, weight, deck_id } = req.body;

  const parseResult = cardSchema.safeParse({ term, definition, weight });
  if (!parseResult.success) {
    res.status(400).json({ error: "Ungültige Kartendaten" });
    return;
  }

  try {
    const inserted = await db
      .insert(cards)
      .values({ term, definition, weight, deck_id });

    res.status(201).json(inserted);
  } catch (err) {
    console.error("Fehler beim Hinzufügen der Karte:", err);
    res.status(500).json("Fehler beim Speichern der Karte");
  }
});
