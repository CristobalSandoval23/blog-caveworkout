export function BtnMenu(){
    
    
    const  $btnMenu = document.createElement("div");
    let cerrado = true;
    $btnMenu.classList.add("NavBtn")
    $btnMenu.innerHTML = `
    <i class="IconoHamburguesa fas fa-bars" id="IconoHamburguesa"></i>
    <i class="IconoCruz fas fa-times" id="IconoCruz"></i>  
    `;
        
        document.addEventListener('click', (e)=>{
          const $IconoHamburguesa = document.getElementById('IconoHamburguesa'),
                $IconoCruz = document.getElementById('IconoCruz'),
                $Menu = document.querySelector(".menu");
          if(e.target.matches(".IconoHamburguesa.fas.fa-bars") || 
             e.target.matches(".IconoCruz.fas.fa-times")) {
              if (cerrado) {              
                $Menu.style.width = '60vw';
                $IconoHamburguesa.style.transition = '0.5s';
                $IconoHamburguesa.style.opacity = '0';
                $IconoCruz.style.opacity = '1';
                $IconoCruz.style.transition = '1s';
                cerrado = false;
              }else{
                $Menu.style.width = '0%';
                $IconoHamburguesa.style.opacity = '1';
                $IconoHamburguesa.style.transition = '1s';
                $IconoCruz.style.opacity = '0';
                $IconoCruz.style.transition = '0.5s';
                $Menu.style.overflow = 'hidden';
                cerrado = true;
              }
  
             };
      });

    return $btnMenu;
}