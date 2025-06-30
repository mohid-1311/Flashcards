import { sqliteTable, integer, text, AnySQLiteColumn } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"
import { users } from "./users-schema"
import { cards } from "./cards-schema"
import { z } from "zod"

export const decks = sqliteTable('decks', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  user_name: text().notNull().references((): AnySQLiteColumn => users.name),
})

export const decksRelations = relations(decks, ({many}) => ({
  cards: many(cards)
}))

// ZOD
export const deckSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  user_name: z.string(),
})

export const deleteDeckSchema = z.object({
  name: z.string()
});


export type Deck = z.infer<typeof deckSchema>