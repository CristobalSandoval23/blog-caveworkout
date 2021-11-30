import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { ajax } from "../helpers/ajax.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";
import { Login } from "./LoginForm.js";
import { LoginPost } from "./LoginPost.js";

export async function Router(){
    const d = document,
            w = window,
          $main = d.getElementById("main");

        let {hash} = location;

        $main.innerHTML = null;

        if(!hash || hash === "#/"){
           await ajax({
                url: api.POSTS,
                cbSuccess:(posts)=>{
                    let html ="";
                    posts.forEach(post => html += PostCard(post));
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
                        No exsten resultados de búsqueda para el término
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
            await ajax({
                url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
                cbSuccess:(post)=>{
                    $main.innerHTML = Post(post);
                }
            })
        }

        d.querySelector(".loader").style.display = "none";
   
}