import { mysqlTable, varchar } from "drizzle-orm/mysql-core"

export const users = mysqlTable('users', {
  name: varchar({ length: 16 }).primaryKey(),
  password: varchar({ length: 64 })
});