import api from "../helpers/wp_api.js";
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

        if(!hash || hash === "#/"){          
            let url = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
            method = "GET";
            await ajax({
                url,
                method,
                cbSuccess: async(posts)=>{
                    let html = "";
                    await posts["data"].forEach(post => html += PostCard(post));
                    $main.innerHTML = html;
                        localStorage.setItem("totalPost", posts["total"])
                        api_cw.limite += 10;
                        api_cw.desde += 10;
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
              let url = "https://mi-primer-restserver.herokuapp.com/api/productos?limite=5",
                  method = "GET";
          await ajax({
                url,
                method,
                cbSuccess:(posts)=>{
                    let html = "";
                    posts["data"].forEach(post => html += LoginPost(post));
                    $main.innerHTML = html;
                }
            })
        }else{
            $main.innerHTML = `<h2>Aqui cargará el contenido de el post previamente seleccionado </h2>`
            api_cw.limite = 10, api_cw.desde = 0;
            await ajax({
                url: `${api_cw.PRODUCTOS}/${localStorage.getItem("wpPostId")}`,
                cbSuccess:(post)=>{
                    location.hash = `#/${localStorage.getItem("wpPostId")}`
                    $main.innerHTML = Post(post);
                }
            })
        }

        d.querySelector(".loader").style.display = "none";
   
}