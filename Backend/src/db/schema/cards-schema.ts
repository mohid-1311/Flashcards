import { mysqlTable, int, text, AnyMySqlColumn } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"
import { decks } from "./decks-schema"
import { z } from "zod"

export const cards = mysqlTable('cards', {
  id: int().primaryKey().autoincrement(),
  term: text().notNull(),
  definition: text().notNull(),
  weight: int().notNull().default(10),
  deck_id: int().notNull().references((): AnyMySqlColumn => decks.id)
})

export const cardsRelations = relations(cards, ({ one }) => ({
  deck: one(decks)
}))

// ZOD
export const cardSchema = z.object({
  id: z.number().int().optional(),
  term: z.string(),
  definition: z.string(),
  weight: z.number().int().default(10),
  deck_id: z.number().int(),
})

export type Card = z.infer<typeof cardSchema>