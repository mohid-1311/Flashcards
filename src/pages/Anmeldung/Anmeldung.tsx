import { useState } from "react";
import styles from "./Anmeldung.module.css"
import AnmeldungComp from "../../Components/Anmeldung/AnmeldungComp";
import RegistrierungComp from "../../Components/Registrierung/RegistrierungComp";
import "../../data";
import { useNavigate } from "react-router-dom";

function Anmeldung(){
  
  const [anmeldung, setAnmeldung] = useState(false)
  return(
    <>
      {!anmeldung && <RegistrierungComp setAnmeldung={setAnmeldung}/>}
      {anmeldung && <AnmeldungComp setAnmeldung={setAnmeldung}/>}
    </>
  );
}
export default Anmeldung