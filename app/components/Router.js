import api_cw from "../helpers/cw_api.js";
import { ajax } from "../helpers/ajax.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";
import { Login } from "./LoginForm.js";
import { PostCard } from "./PostCard.js";
import { Dashboard } from "./Dashboard.js";

export async function Router(){
    const d = document,
          $main = d.getElementById("main");

        let {hash} = location;
        d.documentElement.scrollTop = 0;
        $main.innerHTML = null;
        api_cw.limite = 10;
        api_cw.desde = 0;
        localStorage.setItem("Pagina", false)
       
        if(!hash || hash === "#/"){  
    
            let url = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
            method = "GET";
            await ajax({
                url,
                method,
                cbSuccess: async(posts)=>{   
                    console.log("get-inicial")                 
                    let html = "";
                    await posts["data"].forEach(post => html += PostCard(post));
                    $main.innerHTML = html;
                        localStorage.setItem("totalPost", posts["total"])
                        localStorage.setItem("Pagina", true)
                        localStorage.setItem("totalElement", $main.childElementCount)
                        api_cw.limite += 10;
                        api_cw.desde += 10;
                }
            })
        } else if(hash.includes("#/search")){

            let query = localStorage.getItem("wpSearch")

            if(!query){
                console.log("vacio")
                d.querySelector(".loader").style.display = "none";
                return false;
            }
            await ajax({
                url: `${api_cw.SEARCH}/productos/${query}`,
                cbSuccess:(search)=>{
                    let html = "";
                    console.log("Entre aqui 1", search["results"].length)
                    if(search["results"].length === 0){
                        html = `
                        <p class="error"> 
                        No existen resultados de búsqueda para el término
                            <mark>${query}</mark>
                        </p>
                        `;

                    }else{
                        console.log(search["results"]);
                        search["results"].forEach((post)=> (html += SearchCard(post)))
                        localStorage.setItem("totalPost", search["results"].length)
                    }
                    $main.innerHTML = html;
                    localStorage.setItem("totalElement", $main.querySelectorAll("article").length)
                }
            })
        } else if(hash.includes("#/contacto")){
            
            $main.appendChild(ContactForm());
            
        } else if(hash.includes("#/login")){
            let fecha = new Date();
            let expiracion = localStorage.getItem("expiration");
            if(fecha.setTime(fecha) < fecha.setTime(expiracion)){
                location.hash = "#/usuario";
            }
            $main.appendChild(Login());

        } else if(hash.includes("#/usuario")){
            
            $main.appendChild(Dashboard());
        }else{
            $main.innerHTML = `<h2>Aqui cargará el contenido de el post previamente seleccionado </h2>`
            await ajax({
                url: `${api_cw.PRODUCTOS}/${localStorage.getItem("wpPostId")}`,
                cbSuccess:(post)=>{

                    
                    console.log("Entre aqui 2")
                    $main.innerHTML = Post(post);
                    location.hash = `#/${localStorage.getItem("wpPostId")}`
                    api_cw.limite = 10, api_cw.desde = 0;
                    localStorage.setItem("totalElement", 0)
                    localStorage.setItem("totalPost", 0)
                }
            })
        }

        d.querySelector(".loader").style.display = "none";
   
}