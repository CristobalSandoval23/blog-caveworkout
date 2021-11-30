export function LoginPost(props){
    let {nombre} = props;

    return `
    <article class="post-card">
        <img src="" alt="">
        <h2>${nombre}</h2>
    </article>
    `;

}