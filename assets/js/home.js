

window.addEventListener("load", ()=> showHome())

const showHome = ()=>{
    const contenedorMain = document.getElementById("contenedorMain")
    const footer = document.getElementById("footer")
    const loadingIcon = document.getElementById("loadingIcon")

    contenedorMain.className    == "hidden" && contenedorMain.classList.replace("hidden","contenedorMain")
    footer.className            == "hidden" && footer.classList.replace("hidden","footer")
    loadingIcon.className       == "loadingIcon" && loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
}




