import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { and, eq } from "drizzle-orm"
import { decks, deckSchema } from "../db/schema/decks-schema"
import { users } from "../db/schema/users-schema"

export const router = express.Router()

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

router.put("/:username/:deckname", async (request, response) => {
  const body = request.body
  
  const parseResult = deckSchema.safeParse(body)
  if (!parseResult.success) {
    response.status(400).json({ error: parseResult.error.errors })
    return
  }
  const validData = parseResult.data

  const query = await db
    .update(decks)
    .set(validData)
    .where(
      and(
        eq(decks.user_name, request.params.username),
        eq(decks.name, request.params.deckname)
      )
    )
  if(query.rowsAffected === 1) {
    response.status(200).json(validData)
  } else {
    response.status(404).send("No rows were affected!")
  }
})