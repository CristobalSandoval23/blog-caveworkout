import api_cw from "./cw_api.js";
import {ajax} from "./ajax.js";
import {SearchCard} from "../components/SearchCard.js";
import {PostCard} from "../components/PostCard.js";
import { NavegatorUserAndDevice } from "./navegator_and_davice__user.js";

export  function InfiniteScroll(){
    const d = document,
          w = window,
          $main = d.getElementById("main");

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        method,
        totalScroll,
        comparar,
        Component;
        
        d.addEventListener("scroll", async (e)=> {

            let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
                {hash} = w.location;
            
            if(NavegatorUserAndDevice().sBrowser !== "Apple Safari" && NavegatorUserAndDevice().sDevice === "Mobile"){
                totalScroll = w.scrollY + w.outerHeight
                comparar = totalScroll >= scrollHeight;
            }else{
                totalScroll = scrollTop + clientHeight  
                comparar = totalScroll === scrollHeight;
            }
            
            if(comparar){
                if(!hash || hash === "#/"){
                    localStorage.setItem("totalElement", $main.childElementCount)
                    apiURL = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
                    method = "GET";
                    Component = PostCard;
                } else if(hash.includes("#/search")){
                    apiURL = `${api_cw.SEARCH}/productos/${query}`
                    Component = SearchCard;
                }else if(hash.includes("#/contacto")){
                    return false;
                }else if(hash.includes("#/usuario")){
                    return false;
                }
                else{
                    return false;
                }       
                if(localStorage.getItem("Pagina") === "false"){
                    return false;
                }

                if(Number(localStorage.getItem("totalPost")) > $main.childElementCount){
                    await ajax({
                        url: apiURL,
                        method,
                        cbSuccess: async(posts)=>{
                            let html = "";                                    
                            localStorage.setItem("totalPost", posts["total"])
                            if(posts["data"].length !== 0){                         
                                d.querySelector(".loader").style.display = "block"
                                await posts["data"].forEach(post => html += Component(post))
                                if(location.hash.includes("#/contacto") 
                                || location.hash.includes("#/login")
                                || (location.hash.includes("#/search") && localStorage.getItem("wpSearch") === null)
                                || location.hash.includes(`${localStorage.getItem("wpPostId")}`))  return false;                                                        
                               await $main.insertAdjacentHTML("beforeend", html);
                               d.querySelector("html").style.overflow = "scroll";
                               api_cw.limite += 20;
                               api_cw.desde += 20;
                          }           
                       }
                      }); 
                }else{
                   
                    let html = "";
                    if(($main.lastElementChild.className === "proximamente") === true){                               
                          return false;
                      };
                      d.querySelector(".loader").style.display = "none";  
                      html = `
                          <h3 class="proximamente">
                          Proximamente <br> 
                          nuevos contenidos ${localStorage.getItem("totalPost")}-${localStorage.getItem("totalElement")}
                           </h3>
                      `;
                      await $main.insertAdjacentHTML("beforeend", html);
                }
            }
        })
}