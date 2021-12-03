export function SearchCard(props){
let {_id, categoria} = props;

return `
    <article class="post-card">
        <h2> ${categoria["nombre"]}</h2>
        <p>
            <a  href="#/${_id}"  data-id="${_id}">Ver publicación</a>
        </p>
    </article>
`;
}