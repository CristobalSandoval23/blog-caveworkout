import { Loader } from "./components/Loader.js";
import { Posts } from "./components/Posts.js";
import { Header } from "./components/Header.js";
import { Router } from "./components/Router.js";
export function App() {
    const $root = document.getElementById("root");
        $root.innerHTML = null;
        $root.appendChild(Header())
        $root.appendChild(Posts())
        $root.appendChild(Loader())

        Router();
}
