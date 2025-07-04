import express from "express"
import { drizzle } from "drizzle-orm/mysql2"
import { eq } from "drizzle-orm"
import { users, userSchema } from "../db/schema/users-schema"

export const router = express.Router()
router.use(express.json())
const db = drizzle(process.env.DATABASE_FILE!)

/**
 * ../users/{:username}
 *  - Alle Benutzer
 *  - Benutzer mit bestimmtem Namen
 * @return {JSX.Element}
 */
router.get("/{:user_name}", async (req, res) => {
  const query = await db.select().from(users).where(eq(users.name, req.params.user_name || users.name))

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(query)
})

router.get("/", async (req, res) => {
  const alle = await db.select().from(users);
  res.status(200).json(alle);
});

router.post("/", async (req, res) => {
  const body = req.body

  const parseResult = userSchema.safeParse(body)
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.errors })
    return
  }
  const validData = parseResult.data

  await db.insert(users).values(validData)

  res.setHeader("Content-Type", "application/json")
  res.status(201).json(body)
})