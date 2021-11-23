export function PostCard(props) {
    let {date, slug, title, _embedded} = props;
    let dateFormat = new Date(date).toLocaleString(),
        urlPoster = _embedded["wp:featuredmedia"] 
                    ? _embedded["wp:featuredmedia"][0].source_url 
                    : "app/assest/loader.gif";

    return `
        <article class="post-card">
            <img src="${urlPoster}" alt="${title.rendered}">
            <h2>${title.rendered}</h2>
            <p>
                <time datatime="${date}"> ${dateFormat}</time>
                <a href="#/${slug}">Ver publicación</a>
            </p>
        </article>
    `;
}