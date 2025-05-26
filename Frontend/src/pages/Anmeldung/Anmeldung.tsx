import { useState } from "react";
import AnmeldungComp from "../../Components/Anmeldung/AnmeldungComp";
import RegistrierungComp from "../../Components/Registrierung/RegistrierungComp";
import "../../data";


type AnmeldungProps = {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Anmeldung({setShowNav, setIsAuthentificated}: AnmeldungProps){
  
  const [anmeldung, setAnmeldung] = useState(true)
  return(
    <>
      {!anmeldung && <RegistrierungComp setAnmeldung={setAnmeldung}/>}
      {anmeldung && <AnmeldungComp setShowNav={setShowNav} setAnmeldung={setAnmeldung} setIsAuthentificated={setIsAuthentificated}/>}
    </>
  );
}
export default Anmeldung