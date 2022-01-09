export function PostCard(props) {
    let {nombre, precio, img, _id} = props;
    let urlPoster = img 
                    ? img
                    : "app/assest/loader.gif";

 document.addEventListener("click", e =>{
     if(!e.target.matches(".post-card a")) return false;
     localStorage.setItem("wpPostId", e.target.dataset.id);
     location.hash = `#/${localStorage.getItem("wpPostId")}`;
 })                   
    return `
        <article class="post-card">
            <img src="${urlPoster}" alt="${nombre}">
            <h2>${nombre}</h2>
            <p>
                <span>${precio}</span>
                <a data-id="${_id}">Ver publicación</a>
            </p>
        </article>
    `;
}