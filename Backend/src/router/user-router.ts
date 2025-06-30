import express from "express"
import { drizzle } from "drizzle-orm/libsql"
import { eq } from "drizzle-orm"
import { users, userSchema } from "../db/schema/users-schema"
import { z } from "zod"

export const router = express.Router()
router.use(express.json())

const db = drizzle(process.env.DATABASE_FILE!)

/**
 * ../users/{:username}
 *  - Alle Benutzer
 *  - Benutzer mit bestimmtem Namen
 * @return {JSX.Element}
 */
router.get("/{:username}", async (request, response) => {
  const query = await db.select().from(users).where(eq(users.name, request.params.username || users.name))

  response.setHeader("Content-Type", "application/json")
  response.status(200).json(query)
})

router.get("/", async (req, res) => {
  const alle = await db.select().from(users);
  res.status(200).json(alle);
});

router.post("/", async (request, response) => {
  const body = request.body

  const parseResult = userSchema.safeParse(body)
  if (!parseResult.success) {
    response.status(400).json({ error: parseResult.error.errors })
    return
  }
  const validData = parseResult.data

  const query = await db.insert(users).values(validData)

  response.setHeader("Content-Type", "application/json")
  console.log(query.rows)
  response.status(201).json(body)
})