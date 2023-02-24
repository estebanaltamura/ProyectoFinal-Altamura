const contenedorMain = document.getElementById("contenedorMain")
const footer = document.getElementById("footer")
const loadingIcon = document.getElementById("loadingIcon")

window.addEventListener("load", ()=>showHome())

const showHome = ()=>{
        contenedorMain.className    == "hidden" && contenedorMain.classList.replace("hidden","contenedorMain")
        footer.className            == "hidden" && footer.classList.replace("hidden","footer")
        loadingIcon.className       == "loadingIcon" && loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
}


