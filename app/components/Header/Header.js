import { BtnMenu } from "./BtnMenu.js";
import { Menu } from "./Menu.js";
import { SearchForm } from "./SearchForm.js";
import { Title } from "./Title.js";

export function Header(){
    const $header = document.createElement("header");

    $header.classList.add("header");
    $header.appendChild(Menu());
    $header.appendChild(BtnMenu());
    $header.appendChild(SearchForm());
    $header.appendChild(Title());

    return $header;
}