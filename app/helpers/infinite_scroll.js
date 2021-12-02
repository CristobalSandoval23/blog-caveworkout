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
            // w.menubar.visible = no;
            console.log(w.menubar.visible)
            localStorage.setItem("menubar", w.menubar.visible)
            let {scrollTop, clientHeight, scrollHeight, offsetHeight} = d.documentElement,
                {hash} = w.location;
            console.log(offsetHeight, w.scrollY)
            localStorage.setItem("scrollTop", w.scrollY)
            localStorage.setItem("clientHeight", w.outerHeight)
            localStorage.setItem("totalScroll", w.scrollY + w.innerHeight)
            localStorage.setItem("scrollHeight", scrollHeight)
            // if()
            if( w.scrollY + w.outerHeight >= scrollHeight ){
                console.log("scroll se activa")
                if(!hash || hash === "#/"){
                    console.log("entro a inicio")
                    
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
                    
                    console.log(api_cw.limite, api_cw.desde)
                    console.log("Contacto")
                    return false;
                }else if(hash.includes("#/usuario")){
                    console.log("Usuario")
                    return false;
                }
                else{
                    return false;
                }       
                if(localStorage.getItem("Pagina") === "false"){
                    console.log("sali")
                    return false;
                }

                if(Number(localStorage.getItem("totalPost")) > $main.childElementCount){
                    console.log("Se invoco el fetch")
                    
                    await ajax({
                       url: apiURL,
                       method,
                       cbSuccess: async(posts)=>{
                           let html = "";                                    
                           localStorage.setItem("totalPost", posts["total"])
                          if(posts["data"].length !== 0){                         
                              console.log("Se va a cargar los post")
                               await posts["data"].forEach(post => html += Component(post))
                               if(location.hash.includes("#/contacto") 
                               || location.hash.includes("#/login")
                               || (location.hash.includes("#/search") && localStorage.getItem("wpSearch") === null)
                               || location.hash.includes(`${localStorage.getItem("wpPostId")}`)) return false;                        
                               await $main.insertAdjacentHTML("beforeend", html);
                               d.querySelector(".loader").style.display = "block";
                               d.querySelector("html").style.overflow = "scroll";
                               api_cw.limite += 10;
                               api_cw.desde += 10;
                          }else{
                              console.log("No se va a cargar los post")
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
                          <br> ${scrollTop + clientHeight}-${scrollHeight}
                           </h3>
                      `;
                      await $main.insertAdjacentHTML("beforeend", html);
                }
            }
        })
}