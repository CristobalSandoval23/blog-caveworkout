import { Mapa } from "./Mapa.js";
import { RedesSociales } from "./RedesSociales.js";

export function Footer(){
   const $footer = document.createElement("footer");  
   $footer.classList.add("footer");

   if(location.hash === "" || location.hash === "#/" || location.hash.includes("#/search")) return $footer;
    $footer.appendChild(RedesSociales());
    $footer.appendChild(Mapa());

    return $footer;
}