import { mysqlTable, varchar } from "drizzle-orm/mysql-core"

export const benutzer = mysqlTable('benutzer', {
  name: varchar({ length: 16 }).primaryKey(),
  passwort: varchar({ length: 64 })
});