import api from "../helpers/cw_api.js"
export function Title() {
    const $h1 = document.createElement('h1');
    $h1.classList.add("header-title")
    // $h1.innerHTML = `
    //     <a href="${api.DOMAIN}" target="_blank" rel="noopener" >
    //         ${api.NAME_TITLE.toUpperCase()}
    //     </a>
    // `;
    $h1.innerHTML = `
        <a href="${api.DOMAIN}" target="_blank" rel="noopener" >
        ${localStorage.getItem("menubar")} -
        </a>
    `;

    return $h1;
}