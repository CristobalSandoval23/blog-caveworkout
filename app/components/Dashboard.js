export function Dashboard(){
    const $dashboard = document.createElement("div");

    $dashboard.innerHTML = `        
        <article class="all-btn"> 
        <input type="submit" value="Agregar Post">
        <input type="submit" value="Agregar Categoria">
        <input type="submit" value="Agregar Usuario">
        </article>
        <table class="table-post">
            <tr class="table-head">
                <td>N°</td>
                <td>Nombre</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Pedro</td>
                <td><a href="https://google.com/">Detalle</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Juan</td>
                <td><a href="https://google.com/">Detalle</td>
            </tr>
        </table>
        <section class="detalles">
        
        <article class="card">
            <h2>Post</h2>
            <span>1</span>
            <i class="far fa-edit"></i>
        </article>
        <article class="edit-post">
            <h2>Categoria</h2>
            <span>4</span>
            <i class="fas fa-folder"></i>
        </article>
        <article class="edit-post">
            <h2>Users</h2>
            <span>5</span>
            <i class="fas fa-users"></i>
        </article>
        </section>

    `;

    return $dashboard;
}