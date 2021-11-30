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
            localStorage.setItem("continuar",true)
            let url = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
            method = "GET";
            await ajax({
                url,
                method,
                cbSuccess:(posts)=>{
                    let html = "";
                    posts["data"].forEach(post => html += PostCard(post));
                    $main.innerHTML = html;
                }
            })
        } else if(hash.includes("#/search")){

            let query = localStorage.getItem("wpSearch")

            if(!query){
                d.querySelector(".loader").style.display = "none";
                return false;
            }
            await ajax({
                url: `${api.SEARCH}${query}`,
                cbSuccess:(search)=>{
                    let html = "";
                    if(search.length === 0){
                        html = `
                        <p class="error"> 
                        No existen resultados de búsqueda para el término
                            <mark>${query}</mark>
                        </p>
                        `;

                    }else{
                        search.forEach((post)=> (html += SearchCard(post)))
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
            api_cw.limite = 5, api_cw.desde = 0, api_cw.continuar = true;
            localStorage.setItem("continuar", true)
            console.log(api_cw.limite, api_cw.desde, api_cw.continuar)
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