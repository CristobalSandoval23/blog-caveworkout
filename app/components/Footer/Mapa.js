import api from '../../helpers/cw_api.js';

export function Mapa(){

    const $mapa = document.createElement("div");

    $mapa.innerHTML = `
    <a href=${api.linkMap} target="_blank" class="mapa">
    <i class="fas fa-map-marker-alt"></i>
    <h3>La Granja, Chile</h3>
    </a>
    `;

    return $mapa;

}
