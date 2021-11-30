export function RedesSociales(){
    const $redesSociales = document.createElement("article");
    $redesSociales.classList.add("redesSociales")
    $redesSociales.innerHTML = `
    <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
    <a href="https://www.youtube.com" target="_blank"><i class="fab fa-youtube"></i></a>
    <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
    `;
     return $redesSociales;
 }