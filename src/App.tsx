import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route } from "react-router-dom"
import React from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
import Lernmodi from "./pages/Lernmodi/Lernmodi"
function App() {
  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/Startseite" element={<Startseite/>}></Route>
          <Route path="/Hinzufuegen" element={<Hinzufuegen/>}></Route>
          <Route path="/Verwaltung" element={<Verwaltung/>}></Route>
          <Route path="/Fortschritt" element={<Fortschritt/>}></Route>
          <Route path="/Importieren" element={<Importieren/>}></Route>
          <Route path="/Lernmodi" element={<Lernmodi/>}></Route>
        </Routes>
      </div>
   </>
  );
}
export default App;
