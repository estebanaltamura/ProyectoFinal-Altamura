const contenedorMain = document.getElementById("contenedorMain")
const footer = document.getElementById("footer")
const loadingIcon = document.getElementById("loadingIcon")


window.addEventListener("DOMContentLoaded", ()=>showHome())

const imagen1 = document.getElementById("portadaMobile")
const imagen2 = document.getElementById("portada375")
const imagen3 = document.getElementById("portadaTablet")
const imagen4 = document.getElementById("portadaDesktop")

//imagen1.addEventListener("load",()=>showHome())
//imagen2.addEventListener("load",()=>showHome())
//imagen3.addEventListener("load",()=>showHome())
//imagen4.addEventListener("load",()=>showHome())

const showHome = ()=>{
    
        contenedorMain.className    == "hidden" && contenedorMain.classList.replace("hidden","contenedorMain")
        footer.className            == "hidden" && footer.classList.replace("hidden","footer")
        loadingIcon.className       == "loadingIcon" && loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
     
    
}


