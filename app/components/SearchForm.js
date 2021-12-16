export function SearchForm(){
    const d = document,
          $searchForm = d.createElement("form"),
          $input = d.createElement("input");

        $searchForm.classList.add("search-form");    
        $input.name = "search";
        $input.type = "search";
        $input.placeholder = "Buscar...";
        $input.autocomplete = "off";
        
        
        $searchForm.appendChild($input);
        
     if(location.hash.includes("#/search")){
        $input.value = localStorage.getItem("wpSearch");
    }
    if (location.hash.includes("#/usuario")) {
        $searchForm.style.display = "none";
    }

    d.addEventListener("search", e =>{
        if(!e.target.matches("input[type='search']")) return false;
        if(!e.target.value) localStorage.removeItem("wpSearch");
    })

    d.addEventListener("submit", (e)=>{

        if(!e.target.matches(".search-form")) return false;

        e.preventDefault();

        localStorage.setItem("wpSearch", e.target.search.value);
        location.hash = `#/search?search=${e.target.search.value}`;

    })
    return $searchForm;

}