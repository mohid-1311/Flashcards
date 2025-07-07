import "dotenv/config"
import express from "express"
import cors from "cors"
import { router as userRouter } from "./router/user-router"
import { router as deckRouter } from "./router/deck-router"
import { router as cardRouter } from "./router/card-router"

export const app = express();
app.use(express.json()); 

const port = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/decks", deckRouter)
app.use("/cards", cardRouter)

if (process.env.NODE_ENV !== "test") { // Wird gebraucht, da jest sonst nicht automatisch beendet wird.
  app.listen(port, () => {
    console.log("Server gestartet")
  });
}