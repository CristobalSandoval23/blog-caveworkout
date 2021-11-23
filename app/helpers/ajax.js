export function ajax(props){
    let {url, cbSuccess} = props;
    fetch(url)
        .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
        .then(json => cbSuccess(json))
        .catch(err => {
            let message = err.statusText || "Ocurrio un error al acceder a la API";

            document.getElementById('root').innerHTML = `
            <div class="error">
                <p>Error ${err.status}: ${message}</p>
            </div>
            `;

            document.querySelector(".loader").style.display = "none";
            console.log(err);

        })
}