export function Menu(){

    const $menu = document.createElement("nav");
    $menu.classList.add("menu");
    $menu.innerHTML = `
        <a href="#/">Home</a>
        <a href="#/search">Busqueda</a>
        <a href="#/contacto">Contacto</a>
        <a href="#/login">Login</a>
        
    `;
       return $menu;

}