import {fetchData} from "./getDataModule.js"
import {novedadesyColeccionesPrinting} from "./novedadesyColeccionesPrinting.js"

const contenedorCards = document.getElementById("contenedorCards")

let coleccion

document.addEventListener("DOMContentLoaded", (e)=>{
    const colectionName = getColectionName(e)
    const productosByColeccion = fetchData(colectionName)
    coleccion = productosByColeccion
    novedadesyColeccionesPrinting(productosByColeccion)
}) 

const getColectionName = (e)=> {
    const evento = e.target.baseURI
    const cadenaCompleta       = evento
    const inicioCadenaaExtraer = evento.lastIndexOf("/")+1
    const finalCadenaaExtraer  = evento.length-5
    return cadenaCompleta.slice(inicioCadenaaExtraer, finalCadenaaExtraer)
}

const getIdEnlaceCliqueado = (e)=>{ 
    if (e.target.localName == "img")     return (e.target.parentNode.id) 
    else if (e.target.localName == "p")  return (e.target.parentNode.id)
    else if (e.target.localName == "a")  return (e.target.id)
    else return false
}

const getProducto =(id)=>{
    
    return coleccion.filter(element=>element.id == id)
}

contenedorCards.addEventListener("click",(e)=>{
    if (getIdEnlaceCliqueado(e)){

        const producto = getProducto(getIdEnlaceCliqueado(e))[0]
        console.log(producto)
        localStorage.setItem(
            "infoToProductPage",
            JSON.stringify(
                {"idProduct" : getIdEnlaceCliqueado(e),
                 "colectionName" : getColectionName(e),
                 "imagen" : producto.imagen,
                 "nombre" : producto.nombre,
                 "precio" : producto.precio,
                 "cantidad" : 1
                }
            )
        )
        window.location.href = `../pages/producto.html` 
    }
})

