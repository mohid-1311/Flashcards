import { useState } from "react";
import styles from "./Anmeldung.module.css"
import AnmeldungComp from "../../Components/Anmeldung/AnmeldungComp";
import RegistrierungComp from "../../Components/Registrierung/RegistrierungComp";
import "../../data";
import { useNavigate } from "react-router-dom";

type AnmeldungProps = {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function Anmeldung({setShowNav}: AnmeldungProps){
  
  const [anmeldung, setAnmeldung] = useState(false)
  return(
    <>
      {!anmeldung && <RegistrierungComp setAnmeldung={setAnmeldung}/>}
      {anmeldung && <AnmeldungComp setShowNav={setShowNav} setAnmeldung={setAnmeldung}/>}
    </>
  );
}
export default Anmeldung