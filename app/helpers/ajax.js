export async function ajax(props){
    let {url, 
         method, 
         headers = { "Content-type": "application/json; charset=utf-8"}, 
         body,
         cbSuccess} = props;

    await fetch(url, {method, headers, body})
        .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
        .then(json => cbSuccess(json))
        .catch(err => {
            let message = err.statusText || "Ocurrio un error al acceder a la API";

            document.getElementById('main').innerHTML = `
            <div class="error">
                <p>Error ${err.status}: ${message}</p>
            </div>
            `;

            document.querySelector(".loader").style.display = "none";
            console.log(err);

        })
}