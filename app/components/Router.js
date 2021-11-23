import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { ajax } from "../helpers/ajax.js";

export function Router(){
    const d = document;
    ajax({
        url: api.POSTS,
        cbSuccess:(posts)=>{
            let html ="";
            console.log(posts)
            posts.forEach(post => html += PostCard(post));
            d.querySelector(".loader").style.display = "none";
            d.getElementById("posts").innerHTML = html;
        }
    })
    // return ;
}