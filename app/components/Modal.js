export function Modal(){

    const $modal = document.createElement("div");

    $modal.innerHTML = `
    <input type="checkbox" id="btn-modal">
	<label for="btn-modal" class="lbl-modal">Abrir Modal</label>
	<div class="modal">
		<div class="contenedor">
			<header>¡Bienvenidos!</header>
			<label for="btn-modal">X</label>
			<div class="contenido">
				<h3>Agregar un titulo </h3>
				<p> Agregar un mensaje </p>
			</div>
		</div>
	</div>

    `;
    return $modal;
}