import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { ajax } from "../helpers/ajax.js";
import { Post } from "./Post.js";

export async function Router(){
    const d = document,
            w = window,
          $main = d.getElementById("main");

        let {hash} = location;

        console.log(hash)
        $main.innerHTML = null;

        if(!hash || hash === "#/"){
           await ajax({
                url: api.POSTS,
                cbSuccess:(posts)=>{
                    let html ="";
                    console.log(posts)
                    posts.forEach(post => html += PostCard(post));
                    $main.innerHTML = html;
                }
            })
        } else if(hash.includes("#/search")){
            $main.innerHTML = `<h2>Sección del Buscador</h2>`
        } else if(hash.includes("#/contacto")){
            $main.innerHTML = `<h2>Sección del Contacto</h2>`
        } else{
            Post
            $main.innerHTML = `<h2>Aqui cargará el contenido de el post previamente seleccionado </h2>`
            await ajax({
                url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
                cbSuccess:(post)=>{
                    console.log(post)
                    $main.innerHTML = Post(post);
                }
            })
        }

        d.querySelector(".loader").style.display = "none";
   
}