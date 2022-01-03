import { ajax } from "../helpers/ajax.js";
import api from"../helpers/cw_api.js";
export function Modal(){
	
    const d = document,
	 $modal = d.createElement("div");
	 let datos;
    $modal.innerHTML = `
    <input type="checkbox" id="btn-modal">
	 <label for="btn-modal" class="lbl-modal">${(location.hash === `#/${localStorage.getItem("wpPostId")}`)?'<i class="fas fa-edit"></i>':'<a class="fas fa-plus"></a>'}</label>
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
				<p>El procedimiento se realizó con éxito</p>
		 	 </div>
			</div>
		</div>
	</div>

    `;

	async function validationsForm(){
		 
		const $btn = d.querySelector(".enviar"),
		$message = d.querySelector(".contact-form-response");
	
		if(location.hash === `#/${localStorage.getItem("wpPostId")}`){				
			 await setTimeout(() => {	
				datos = JSON.parse(localStorage.getItem("datos"));		
					d.querySelectorAll("input")[2].value = datos["nombre"],
					d.querySelectorAll("input")[3].value = datos["descripcion"];
				}, 700);
		}

	$btn.addEventListener("click", e=>{
		e.preventDefault();

			const categoria = "6139259d0e4c19c8e97cea71",
				  nombre = d.querySelectorAll("input")[2].value,
				  descripcion = d.querySelectorAll("input")[3].value,
				  token = localStorage.getItem("token");  
				  datos = JSON.parse(localStorage.getItem("datos"));
				let url = (location.hash === `#/${localStorage.getItem("wpPostId")}`)? `${api.PRODUCTOS}/${datos["_id"]}`:api.PRODUCTOS,
					method = (location.hash === `#/${localStorage.getItem("wpPostId")}`)?"PUT":"POST",
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
						$message.classList.remove("none");			
					}
					})
					.finally(()=> setTimeout(() =>{      
						(!location.hash.includes("/usuario"))?location.reload():"";
					},3000));
            
		})

	}

	setTimeout(()=>validationsForm(), 100)
    return $modal;
}