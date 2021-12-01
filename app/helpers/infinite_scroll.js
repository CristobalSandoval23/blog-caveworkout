import api from "./wp_api.js";
import api_cw from "./cw_api.js";
import {ajax} from "./ajax.js";
import {SearchCard} from "../components/SearchCard.js";
import {PostCard} from "../components/PostCard.js";

export  function InfiniteScroll(){
    const d = document,
          w = window,
          $main = d.getElementById("main");

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        method,
        Component;
        
        d.addEventListener("scroll", async (e)=> {
            
            let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
                {hash} = w.location;

            if(scrollTop + clientHeight + 200>=  scrollHeight){
                if(!hash || hash === "#/"){
                    d.querySelector("html").style.overflow = "hidden"
                    localStorage.setItem("totalElement", $main.childElementCount)
                    apiURL = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
                    method = "GET";
                    Component = PostCard;
                } else if(hash.includes("#/search")){
                    api_cw.limite += 10;
                    api_cw.desde += 10;
                    apiURL = `${api_cw.SEARCH}/productos/${query}`
                    Component = SearchCard;
                }else if(hash.includes("#/contacto")){
                    console.log("Contacto")
                    return false;
                }else if(hash.includes("#/usuario")){
                    console.log("Usuario")
                    return false;
                }
                else{
                    return false;
                }       
                if(Number(localStorage.getItem("totalPost")) > $main.childElementCount){
                    console.log("----")
                    
                    await ajax({
                       url: apiURL,
                       method,
                       cbSuccess: async(posts)=>{
                           let html = "";                                    
                           localStorage.setItem("totalPost", posts["total"])
                          if(posts["data"].length !== 0){                         
                               await posts["data"].forEach(post => html += Component(post))
                               if(location.hash.includes("#/contacto") 
                               || location.hash.includes("#/login")
                               || (location.hash.includes("#/search") && localStorage.getItem("wpSearch") === null)
                               || location.hash.includes(`${localStorage.getItem("wpPostId")}`)) return false;                        
                               await $main.insertAdjacentHTML("beforeend", html);
                               d.querySelector(".loader").style.display = "block";
                               d.querySelector("html").style.overflow = "visible";
                               api_cw.limite += 10;
                               api_cw.desde += 10;
                          }               
                       }
                      }); 
                }else{
                    let html = ""; 
                    if(($main.lastElementChild.className === "proximamente") === true){
                        d.querySelector("html").style.overflow = "visible";
                          return false;
                      };

                      d.querySelector(".loader").style.display = "none";  
                      html = `
                          <h3 class="proximamente">Proximamente <br> nuevos contenidos ${localStorage.getItem("totalPost")}-${localStorage.getItem("totalElement")}</h3>
                      `;
                      await $main.insertAdjacentHTML("beforeend", html);
                      d.querySelector("html").style.overflow = "visible";
                }
            }
        })
}