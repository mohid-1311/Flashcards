import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
import Anmeldung from "./pages/Anmeldung/Anmeldung"
import Lernmodi from "./pages/Lernmodi/Lernmodi"
import FreierModus from "./pages/Lernmodi/FreierModus"
import KlassischerModus from "./pages/Lernmodi/KlassischerModus"
import SchreibModus from "./pages/Lernmodi/SchreibModus"


import { ProtectedRoute } from "./Authentifiziert"
import "./General.module.css"

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
          <Route path="/Anmeldung" element={<Anmeldung setShowNav={setShowNav} setIsAuthentificated={setIsAuthenticated}/>} />
          <Route path="/Startseite" element={ProtectedRoute(<Startseite/>)}></Route>
          <Route path="/Hinzufuegen" element={ProtectedRoute(<Hinzufuegen/>)}></Route>
          <Route path="/Verwaltung" element={ProtectedRoute(<Verwaltung/>)}></Route>
          <Route path="/Fortschritt" element={ProtectedRoute(<Fortschritt/>)}></Route>
          <Route path="/Importieren" element={ProtectedRoute(<Importieren/>)}></Route>
          <Route path="/Lernmodi" element={ProtectedRoute(<Lernmodi/>)}></Route>
          <Route path="/FreierModus" element={ProtectedRoute(<FreierModus/>)}></Route>
          <Route path="/KlassischerModus" element={ProtectedRoute(<KlassischerModus/>)}></Route>
          <Route path="/SchreibModus" element={ProtectedRoute(<SchreibModus/>)}></Route>
        </Routes>
      </div>
   </>
  );
}
export default App;
