import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
import Lernmodi from "./pages/Lernmodi/Lernmodi"
import FreierModus from "./pages/Lernmodi/FreierModus"
import KlassischerModus from "./pages/Lernmodi/KlassischerModus"
import SchreibModus from "./pages/Lernmodi/SchreibModus"
import Anmeldung from "./pages/Anmeldung/Anmeldung"
import { ProtectedRoute } from "./Authentifiziert"

function App() {

  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")
  const [showNav, setShowNav] = useState(location.pathname.toLowerCase() === "/anmeldung");

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/Anmeldung")
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    setShowNav(location.pathname.toLowerCase() === "/anmeldung");
  }, [location]);

  return (
    <>
      <div>
        {!showNav && (<NavBar/>)}
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
