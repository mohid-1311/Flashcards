import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route } from "react-router-dom"
import React from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
import Lernmodi from "./pages/Lernmodi/Lernmodi"
import FreierModus from "./pages/Lernmodi/FreierModus"
import KlassischerModus from "./pages/Lernmodi/KlassischerModus"
import SchreibModus from "./pages/Lernmodi/SchreibModus"

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
          <Route path="/freier-modus" element={<FreierModus/>} />
          <Route path="/klassischer-modus" element={<KlassischerModus/>} />
          <Route path="/schreib-modus" element={<SchreibModus/>} />
        </Routes>
      </div>
   </>
  );
}
export default App;
