import express from "express"
import cors from "cors"
import { router as userRouter } from "./router/user-router"
import { router as deckRouter } from "./router/deck-router"
import { router as cardRouter } from "./router/card-router"

export const app = express();

app.use(express.json()); 
app.use(cors())

// Router definieren
app.use("/users", userRouter)
app.use("/decks", deckRouter)
app.use("/cards", cardRouter)

export default app