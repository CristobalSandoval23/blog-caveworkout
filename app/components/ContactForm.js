import { ajax } from "../helpers/ajax.js";

export function ContactForm(){
    const d = document,
        $form = d.createElement("form");

        $form.classList.add("contact-form");

        $form.innerHTML = `
        <legend>Envíanos tus comentarios</legend>
        <input type="text" name="name" placeholder="Escribe tu nombre"
          title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" required>
        <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required>
        <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" required>
        <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
          title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
        <input type="submit" value="Enviar">
        <div class="contact-form-loader none">
          <img src="../assets/loader.svg" alt="Cargando">
        </div>
        <div class="contact-form-response none">
          <p>Los datos han sido enviados</p>
        </div>
        `;

        function validationsForm(){
            const $form = d.querySelector(".contact-form"),
                  $inputs = d.querySelectorAll(".contact-form [required]");
                    
                  $inputs.forEach((input) => {

                    const $span = d.createElement("span");
                    $span.id = input.name;
                    $span.textContent = input.title;
                    $span.classList.add("contact-form-error", "none");
                    input.insertAdjacentElement("afterend", $span);                
                  });
            d.addEventListener("keyup", (e)=>{
                if(e.target.matches(".contact-form [required]")){
                    let $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;
                    
                    if(pattern && $input.value !==""){

                        let regex = new RegExp(pattern);
                        return !regex.exec($input.value)
                        ? d.getElementById($input.name).classList.add("is-active")
                        : d.getElementById($input.name).classList.remove("is-active")
                    }

                    if(!pattern){
                        return $input.value === ""
                            ? d.getElementById($input.name).classList.add("is-active")
                            : d.getElementById($input.name).classList.remove("is-active");
                    }
                }
            })

            d.addEventListener("submit", (e)=>{
                e.preventDefault();
                const $loader = d.querySelector(".contact-form-loader"),
                      $response = d.querySelector(".contact-form-response");
                     
                      $loader.classList.remove("none");

                      let url = "https://formsubmit.co/ajax/crisss123xd@gmail.com",
                          method = "POST",
                          body = new FormData(e.target);
                      ajax({url,
                            method,
                            body,
                            cbSuccess:(json) =>{
                                console.log(json);
                                $loader.classList.add("none");
                                $response.classList.remove("none");
                                $response.innerHTML = `<p>${json.message}</p>`
                                $form.reset();
                            }
                          })
                            .finally(()=> setTimeout(() =>{      
                                $response.classList.add("none");
                                $response.innerHTML = "";
                            },3000));
            })
        }

        setTimeout(()=>validationsForm(), 100)
        return $form;
}