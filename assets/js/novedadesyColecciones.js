import {getProducts} from "./getDataModule.js"
import {novedadesyColeccionesPrinting} from "./novedadesyColeccionesPrinting.js"

const contenedorCards = document.getElementById("contenedorCards")
const loadingIcon = document.getElementById("loadingIcon")

const getIdEnlaceCliqueado = (e)=>{ 
    if (e.target.localName == "img")     return (e.target.parentNode.id) 
    else if (e.target.localName == "p")  return (e.target.parentNode.id)
    else if (e.target.localName == "a")  return (e.target.id)
    else return false
}

const getColectionName = (e)=> {
    const url = e.target.baseURI
    const inicioCadenaaExtraer = url.lastIndexOf("/")+1
    const finalCadenaaExtraer  = url.length-5
    return url.slice(inicioCadenaaExtraer, finalCadenaaExtraer)
}

document.addEventListener("DOMContentLoaded", (e)=>{
    const colectionName = getColectionName(e)
    
    const getData = async (colectionName)=>{
        const completeData = await getProducts()
        const completeDataHandled = completeData[0]
        loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
        const productosByColeccion = completeDataHandled[colectionName]
        novedadesyColeccionesPrinting(productosByColeccion)
    } 

    getData(colectionName)
    
}) 

contenedorCards.addEventListener("click",(e)=>{
    if (getIdEnlaceCliqueado(e)) window.location.href = `../pages/product.html?id=${getIdEnlaceCliqueado(e)}` 
})

