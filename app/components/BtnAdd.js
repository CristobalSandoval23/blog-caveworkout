export function BtnAdd(){
    const $bntAdd = document.createElement("div");

    $bntAdd.classList.add("btnAdd")
    $bntAdd.innerHTML = `
    <a class="fas fa-plus"></a>
    `;

    return $bntAdd;
}