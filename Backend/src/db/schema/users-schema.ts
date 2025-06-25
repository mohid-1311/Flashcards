import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"
import { decks } from "./decks-schema"
import { cards } from "./cards-schema"
import { z } from "zod"

export const users = sqliteTable('users', {
  name: text().primaryKey(),
  password: text().notNull()
})

export const usersRelations = relations(users, ({many}) => ({
  decks: many(decks),
  cards: many(cards)
}))

// ZOD
export const userSchema = z.object({
  name: z.string(),
  password: z.string()
})

export type User = z.infer<typeof userSchema>