import { useState } from "react";
import styles from "./Anmeldung.module.css"
import AnmeldungComp from "../../Components/Anmeldung/AnmeldungComp";
import RegistrierungComp from "../../Components/Registrierung/RegistrierungComp";
import "../../data";

function Anmeldung(){
  
  const [anmeldung, setAnmeldung] = useState(false)
  const [registrierung, setRegistrierung] = useState(false)

  return(
    <RegistrierungComp></RegistrierungComp>
  );
}
export default Anmeldung