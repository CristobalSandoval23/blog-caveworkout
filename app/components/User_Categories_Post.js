export function User_Categories_Post(){

    const $user_categories_post = document.createElement("div");

    $user_categories_post.innerHTML = `
    
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

    return $user_categories_post;
}