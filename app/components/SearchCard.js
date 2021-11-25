export function SearchCard(props){
let {id, title, _embedded} = props,
    slug = _embedded

return `
    <article class="post-card">
        <h2> ${title}</h2>
        <p>
            <a href="#/${slug}" data-id="${id}">Ver publicación</a>
        </p>
    </article>
`;
}