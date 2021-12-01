import api from "./wp_api.js";
import api_cw from "./cw_api.js";
import {ajax} from "./ajax.js";
import {SearchCard} from "../components/SearchCard.js";
import {PostCard} from "../components/PostCard.js";

export  function InfiniteScroll(){
    const d = document,
          w = window;

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        method,
        Component;
        
        d.addEventListener("scroll", async (e)=> {
        
            let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
                {hash} = w.location;
           
            if(scrollTop + clientHeight +300>=  scrollHeight){
 
                if(!hash || hash === "#/"){
                    api_cw.limite += 5;
                    api_cw.desde += 5;
                    apiURL = `${api_cw.PRODUCTOS}?limite=${api_cw.limite}&desde=${api_cw.desde}`,
                    method = "GET";
                    Component = PostCard;
                } else if(hash.includes("#/search")){
                    api_cw.limite += 15;
                    api_cw.desde += 0;
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

                 await ajax({
                    url: apiURL,
                    method,
                    cbSuccess: async(posts)=>{
                        let html = "";                                    
                    
                       if(posts["total"] > d.getElementById("main").childElementCount){
                            (localStorage.getItem("continuar") === "true") 
                            ? await posts["data"].forEach(post => html += Component(post))
                            : console.log("entree");
                            if(location.hash.includes("#/contacto") 
                            || location.hash.includes("#/login")
                            || (location.hash.includes("#/search") && localStorage.getItem("wpSearch") === null)
                            || location.hash.includes(`${localStorage.getItem("wpPostId")}`)) return false;                        
                            d.getElementById("main").insertAdjacentHTML("beforeend", html);
                            d.querySelector(".loader").style.display = "block";
                       }else{
                           
                           if((d.getElementById("main").lastElementChild.className === "proximamente") === true){
                               
                               return false;
                           };
                           
                           d.querySelector(".loader").style.display = "none";  
                           html = `
                               <h3 class="proximamente">Proximamente <br> nuevos contenidos</h3>
                           `;
                           d.getElementById("main").insertAdjacentHTML("beforeend", html);
                           localStorage.setItem("continuar", false)
                          
                       }
                        // if(posts["data"].length === 0 ){
                        // } else{        

                         
                            
                        // }                        
                    }
                   }); 
            }
        })
}