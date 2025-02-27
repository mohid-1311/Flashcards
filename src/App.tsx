import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Startseite from "./pages/Startseite/Startseite"
import Hinzufuegen from "./pages/Hinzufuegen/Hinzufuegen"
import Verwaltung from "./pages/Verwaltung/Verwaltung"
import Fortschritt from "./pages/Fortschritt/Fortschritt"
import Importieren from "./pages/Importieren/Importieren"
import Anmeldung from "./pages/Anmeldung/Anmeldung"

function App() {

  const location = useLocation()
  const navigate = useNavigate()
  const [showNav, setShowNav] = useState(false)
  let showNavBar = true
  useEffect(() => {
    navigate("/Anmeldung")
    showNavBar = location.pathname.toLowerCase() === "/anmeldung"
    if(showNavBar){
      setShowNav(true)
    }
  }, [])


  useEffect(() => {
    showNavBar = location.pathname.toLowerCase() === "/anmeldung"
    if(showNavBar){
      setShowNav(true)
    }
  }, [location])

  return (
    <>
      <div>
        {!showNav && (<NavBar/>)}
        <Routes>
          <Route path="/Anmeldung" element={<Anmeldung setShowNav={setShowNav}/>} />
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
