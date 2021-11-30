export function Post(prosp){
    let {usuario ,descripcion, nombre} = prosp;

    return `
    <section class="post-page">
        <aside>
            <h2> ${nombre}</h2>
            <h3> creado por: ${usuario["nombre"]}</h3>
        </aside>
        <hr>
        <article>${descripcion}</article>
    </section>
    `;
}