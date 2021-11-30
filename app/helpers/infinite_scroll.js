import api from "./wp_api.js";
import {ajax} from "./ajax.js";
import {SearchCard} from "../components/SearchCard.js";
import {PostCard} from "../components/PostCard.js";

export  function InfiniteScroll(){
    const d = document,
          w = window;

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        Component;
        
        d.addEventListener("scroll", async (e)=> {
        
            let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
                {hash} = w.location;
           
            if(scrollTop + clientHeight + 100 >=  scrollHeight){
                api.page ++;
                
                if(!hash || hash === "#/"){
                    apiURL = `${api.POSTS}&page=${api.page}`;
                    Component = PostCard;
                } else if(hash.includes("#/search")){
                    apiURL = `${api.SEARCH}${query}&page=${api.page}`
                    Component = SearchCard;
                }else if(hash.includes("#/contacto")){
                    console.log("Contacto")
                    return;
                }else if(hash.includes("#/usuario")){
                    console.log("Usuario")
                    return;
                }
                else{
                    return false;
                }
                
                await ajax({
                    url: apiURL,
                    cbSuccess: (posts)=>{
                        let html = "";
                        posts.forEach(post => html += Component(post));
                        if(location.hash.includes("#/contacto") || location.hash.includes("#/login")) return false;                        
                        d.getElementById("main").insertAdjacentHTML("beforeend", html);
                        d.querySelector(".loader").style.display = "block";
                    }
                });
            }
        })
}