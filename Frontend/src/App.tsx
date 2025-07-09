import NavBar from "./Components/NavBar/NavBar"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Homepage from "./pages/Homepage/Homepage"
import Add from "./pages/Add/Add"
import Management from "./pages/Management/Management"
import Import from "./pages/Import/Import"
import Login from "./pages/Login/Login"
import LearningModes from "./pages/LearningModes/LearningModes"
import FreeMode from "./pages/LearningModes/FreeMode"
import ClassicMode from "./pages/LearningModes/ClassicMode"
import WritingMode from "./pages/LearningModes/WritingMode"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { ProtectedRoute } from "./Authentication"
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
    if(isAuthenticated && location.pathname === "/") {
      navigate("/Startseite");
  }
}, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    setShowNav(location.pathname.toLowerCase() === "/anmeldung");
  }, [location]);

  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={3000}/>
        {!showNav && (<NavBar/>)}
        <Routes>
          <Route path="/Anmeldung" element={<Login setShowNav={setShowNav} setIsAuthentificated={setIsAuthenticated}/>} />
          <Route path="/Startseite" element={ProtectedRoute(<Homepage/>)}></Route>
          <Route path="/Hinzufuegen" element={ProtectedRoute(<Add/>)}></Route>
          <Route path="/Verwaltung" element={ProtectedRoute(<Management/>)}></Route>
          <Route path="/Importieren" element={ProtectedRoute(<Import/>)}></Route>
          <Route path="/Lernmodi" element={ProtectedRoute(<LearningModes/>)}></Route>
          <Route path="/FreierModus" element={ProtectedRoute(<FreeMode/>)}></Route>
          <Route path="/KlassischerModus" element={ProtectedRoute(<ClassicMode/>)}></Route>
          <Route path="/SchreibModus" element={ProtectedRoute(<WritingMode/>)}></Route>
        </Routes>
      </div>
   </>
  );
}
export default App;
