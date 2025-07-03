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

  const parseResult = cardSchema.safeParse({ term, definition, weight, deck_id });
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

router.delete("/:cardId", async (req, res) => {
  const cardId = Number(req.params.cardId);

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