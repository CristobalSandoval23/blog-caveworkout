export function Table(){

    const $table = document.createElement("div");

    $table.innerHTML = `
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
    `;

    return $table;

}