import { Loader } from "./components/Loader.js";
import { Main } from "./components/Main.js";
import { Header } from "./components/Header.js";
import { Router } from "./components/Router.js";
import { InfiniteScroll } from "./helpers/infinite_scroll.js";
import { Footer } from "./components/Footer.js";
export function App() {
    const $root = document.getElementById("root");
        $root.innerHTML = null;
        $root.appendChild(Header())
        $root.appendChild(Main())
        $root.appendChild(Footer())
        $root.appendChild(Loader())

        Router();
        InfiniteScroll();
}
