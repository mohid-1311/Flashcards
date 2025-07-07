import { mysqlTable, varchar } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"
import { decks } from "./decks-schema"
import { cards } from "./cards-schema"
import { z } from "zod"

export const users = mysqlTable('users', {
  name: varchar({ length: 16 }).primaryKey(),
  password: varchar({ length: 64 }).notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  decks: many(decks),
  cards: many(cards)
}))

// ZOD
export const userSchema = z.object({
  name: z.string(),
  password: z.string()
})

export type User = z.infer<typeof userSchema>