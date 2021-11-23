export function Post(prosp){
    let {content ,date, title} = prosp;

    let dateFormat = new Date(date).toLocaleString();
    return `
    <section class="post-page">
        <aside>
            <h2> ${title.rendered}</h2>
            <time datetime="${date}">${dateFormat}</time>
        </aside>
        <hr>
        <article>${content.rendered}</article>
    </section>
    `;
}