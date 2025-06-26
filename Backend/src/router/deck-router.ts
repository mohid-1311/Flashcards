import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { eq } from "drizzle-orm"
import { decks } from "../db/schema/decks-schema"

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