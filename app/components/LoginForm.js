import { ajax } from "../helpers/ajax.js";
import { parseJwt } from "../helpers/parseJwt.js";

export function Login(){
    const d = document,
        $login = d.createElement("form");

        $login.classList.add("login-form");

        $login.innerHTML = `
        <legend>Login</legend>
        <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
          pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" required>
        <input type="text" name="subject" placeholder="Asunto a tratar" title="Contraseña" required>
        <input type="submit" value="Iniciar sesión">
        <div class="login-form-loader none">
          <img src="../assets/loader.svg" alt="Cargando">
        </div>
        <div class="login-form-response none">
          <p>Los datos han sido enviados</p>
        </div>
        `;

        function validationsForm(){
            const $login = d.querySelector(".login-form"),
                  $inputs = d.querySelectorAll(".login-form [required]");
                    
                  $inputs.forEach((input) => {

                    const $span = d.createElement("span");
                    $span.id = input.name;
                    $span.textContent = input.title;
                    $span.classList.add("login-form-error", "none");
                    input.insertAdjacentElement("afterend", $span);                
                  });
            d.addEventListener("keyup", (e)=>{
                if(e.target.matches(".login-form [required]")){
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
                const $loader = d.querySelector(".login-form-loader"),
                      $inputCorreo = d.querySelectorAll(".login-form [required]")[0],
                      $inputPassword = d.querySelectorAll(".login-form [required]")[1],
                      $response = d.querySelector(".login-form-response");

                let   correo = $inputCorreo.value,
                      password = $inputPassword.value;

                      $loader.classList.remove("none");

                      let url = "https://mi-primer-restserver.herokuapp.com/api/auth/login",
                          body = JSON.stringify({
                            correo,
                            password
                          }),
                          method = "POST";
                         
                           ajax(
                          { url,
                            method,
                            body,
                            cbSuccess:(json) =>{
                                console.log(json, "hola");
                                $loader.classList.add("none");
                                $response.classList.remove("none");
                                $response.innerHTML = `<p>${json.message}</p>`
                                $login.reset();
                                let datos = parseJwt(json.token),
                                    fecha = new Date(),
                                    expiration = fecha.setTime(datos.exp *1000);

                                localStorage.setItem("token", json.token)
                                localStorage.setItem("expiration", expiration )
                                location.hash = `#/usuario`;
                            }})                          
            })
        }


        setTimeout(()=>validationsForm(), 100)
        return $login;
}