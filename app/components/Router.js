import api_cw from "../helpers/cw_api.js";
import { ajax } from "../helpers/ajax.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";
import { Login } from "./LoginForm.js";
import { LoginPost } from "./LoginPost.js";
import { PostCard } from "./PostCard.js";

export async function Router(){
    const d = document,
          $main = d.getElementById("main");

        let {hash} = location;

        $main.innerHTML = null;
        api_cw.limite = 10;
        api_cw.desde = 0;
        if(!hash || hash === "#/"){  
    
            d.querySelector("html").style.overflow = "hidden";
            let url = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
            method = "GET";
            await ajax({
                url,
                method,
                cbSuccess: async(posts)=>{
                    console.log(posts["data"])
                    let html = "";
                    await posts["data"].forEach(post => html += PostCard(post));
                    $main.innerHTML = html;
                        localStorage.setItem("totalPost", posts["total"])
                        localStorage.setItem("totalElement", $main.childElementCount)
                        api_cw.limite += 10;
                        api_cw.desde += 10;
                        d.querySelector("html").style.overflow = "visible";
                }
            })
        } else if(hash.includes("#/search")){

            let query = localStorage.getItem("wpSearch")

            if(!query){
                d.querySelector(".loader").style.display = "none";
                return false;
            }
            await ajax({
                url: `${api_cw.SEARCH}/productos/${query}`,
                cbSuccess:(search)=>{
                    let html = "";
                    if(search["results"].length === 0){
                        html = `
                        <p class="error"> 
                        No existen resultados de búsqueda para el término
                            <mark>${query}</mark>
                        </p>
                        `;

                    }else{
                        console.log(search["results"]);
                        // search["results"].forEach((post)=> (html += SearchCard(post)))
                    }
                    $main.innerHTML = html;
                }
            })
        } else if(hash.includes("#/contacto")){
            $main.appendChild(ContactForm());
            
        } else if(hash.includes("#/login")){
            $main.appendChild(Login());
        } else if(hash.includes("#/usuario")){
            
            $main.innerHTML = `<h2>Aqui será en donde se subiran los post </h2>`
        }else{
            $main.innerHTML = `<h2>Aqui cargará el contenido de el post previamente seleccionado </h2>`
            await ajax({
                url: `${api_cw.PRODUCTOS}/${localStorage.getItem("wpPostId")}`,
                cbSuccess:(post)=>{
                    location.hash = `#/${localStorage.getItem("wpPostId")}`
                    $main.innerHTML = Post(post);
                    api_cw.limite = 10, api_cw.desde = 0;
                    localStorage.setItem("totalElement", 0)
                }
            })
        }

        d.querySelector(".loader").style.display = "none";
   
}