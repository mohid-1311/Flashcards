import { sqliteTable, integer, text, AnySQLiteColumn } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"
import { decks } from "./decks-schema"
import { z } from "zod"

export const cards = sqliteTable('cards', {
  id: integer().primaryKey({ autoIncrement: true }),
  term: text(),
  definition: text(),
  weight: integer().notNull().default(10),
  deck_id: integer().notNull().references((): AnySQLiteColumn => decks.id)
})

export const cardsRelations = relations(cards, ({one}) => ({
  deck: one(decks)
}))

// ZOD
export const cardSchema = z.object({
  id: z.number().int().optional(),
  term: z.string().nullable(),
  definition: z.string().nullable(),
  weight: z.number().int().default(10),
  deck_id: z.number().int(),
})

export type Card = z.infer<typeof cardSchema>