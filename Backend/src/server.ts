import dotenv from "dotenv";
import app from "./app"

dotenv.config();

const port = process.env.PORT || 4000 

if (process.env.NODE_ENV !== "test") { // Wird gebraucht, da jest sonst nicht automatisch beendet wird.
  app.listen(port, () => {
    console.log(`Server läuft auf Port: ${port}`)
  });
}