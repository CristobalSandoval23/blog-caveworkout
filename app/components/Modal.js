import { ajax } from "../helpers/ajax.js";
import api from"../helpers/cw_api.js";
export function Modal(){
	
    const d = document,
	 $modal = d.createElement("div");

    $modal.innerHTML = `
    <input type="checkbox" id="btn-modal">
	<label for="btn-modal" class="lbl-modal">Abrir Modal</label>
	<div class="modal">
		<div class="contenedor">
			<header>Agregar Post!</header>
			<label for="btn-modal">X</label>
			<div class="contenido">
			<input type="text" name="nombre" placeholder="Escribe tu nombre"
			  title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" required>
			<input type="text" name="descripcion" placeholder="Descripcion"
			  title="Descripción" required>
			  <br>
			<input type="submit" class="enviar" value="Enviar">
			 <div class="contact-form-response none">
				<p>Los datos han sido enviados</p>
		 	 </div>
			</div>
		</div>
	</div>

    `;

	function validationsForm(){
		
		const $btn = d.querySelector(".enviar");

		$btn.addEventListener("click", e=>{
			e.preventDefault();

				const categoria = "6139259d0e4c19c8e97cea71",
					  nombre = d.querySelectorAll("input")[2].value,
					  descripcion = d.querySelectorAll("input")[1].value,
					  token = localStorage.getItem("token");  
			console.log(nombre,descripcion)

				let url = api.PRODUCTOS,
					method = "POST",
					headers = {
						'Content-Type': 'application/json',
						'x-token': `${token}`
					},
					body = JSON.stringify({
						categoria,
						nombre,
						descripcion
					  });
				ajax({url,
					method,
					headers,
					body,
					cbSuccess:(json) =>{
						console.log(json)
					}
					})
					.finally(()=> setTimeout(() =>{      
						
					},3000));
            
		})

				
	}

	setTimeout(()=>validationsForm(), 100)
    return $modal;
}