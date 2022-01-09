import { Loader } from "./components/Main/Loader.js";
import { Main } from "./components/Main/Main.js";
import { Header } from "./components/Header/Header.js";
import { Modal } from "./components/Main/Modal.js";
import { Footer } from "./components/Footer/Footer.js";
import { Router } from "./components/Router.js";
import { InfiniteScroll } from "./helpers/infinite_scroll.js";
export function App() {
    const $root = document.getElementById("root");
    $root.innerHTML = null;
    $root.appendChild(Header())
    $root.appendChild(Main())
    $root.appendChild(Footer())
    $root.appendChild(Loader())
    
    let fecha = new Date();
		(localStorage.getItem("token") === null
			|| localStorage.getItem("expiration") < fecha )
				? false
        : $root.appendChild(Modal());
        
        Router();
        InfiniteScroll();
}
