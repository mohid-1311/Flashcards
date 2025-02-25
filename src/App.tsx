import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route, useLocation } from "react-router-dom"
import React from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
function App() {

  const location = useLocation()
  const showNavBar = location.pathname.toLowerCase() === "/login"

  return (
    <>
      <div>
        {!showNavBar && (<NavBar/>)}
        <Routes>
          <Route path="/Startseite" element={<Startseite/>}></Route>
          <Route path="/Hinzufuegen" element={<Hinzufuegen/>}></Route>
          <Route path="/Verwaltung" element={<Verwaltung/>}></Route>
          <Route path="/Fortschritt" element={<Fortschritt/>}></Route>
          <Route path="/Importieren" element={<Importieren/>}></Route>
        </Routes>
      </div>
   </>
  );
}
export default App;
