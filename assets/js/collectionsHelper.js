import { getProducts } from "./getDataModule.js"

export const collectionsHelper = {
    collectionsDomContentLoaded: async(e)=>{
        const collectionName = collectionsHelperPrivateMethods.getColectionName(e)
        const collection = await collectionsHelperPrivateMethods.getData(collectionName)
        collectionsHelperPrivateMethods.hideLoadinIcon()
        collectionsHelperPrivateMethods.collectionsPrinting(collection)
    },
    
    collectionItemClicked: (e)=>{
        if (collectionsHelperPrivateMethods.getIdEnlaceCliqueado(e)) window.location.href = `../pages/product.html?id=${collectionsHelperPrivateMethods.getIdEnlaceCliqueado(e)}` 
    }

} 

const collectionsHelperPrivateMethods = {
    getData: async (colectionName)=>{
        const completeData = await getProducts()
        return completeData[0][colectionName]
    }, 

    getColectionName: (e)=> {
        const url = e.target.baseURI
        const inicioCadenaaExtraer = url.lastIndexOf("/")+1
        const finalCadenaaExtraer  = url.length-5
        return url.slice(inicioCadenaaExtraer, finalCadenaaExtraer)
    },

    collectionsPrinting: (productosByColeccion)=>{
        const fragment = document.createDocumentFragment("")
        const contenedorCards = document.getElementById("contenedorCards")
        
        productosByColeccion.forEach((element, i)=> {
            const anchor   = document.createElement("a")
            const img      = document.createElement("img")
            const p1       = document.createElement("p")
            const p2       = document.createElement("p")
    
            anchor.className =`card card${i+1}`
            anchor.id        =`${element.id}`
            
            p1.className     = `tituloCard${i+1} tituloCard`
            p1.textContent   = element.name
            
            p2.className     = `precioCard${i+1} precioCard`
            p2.textContent   = `$ ${element.price}`
    
            img.className    = `imagenCard${i+1} imagenCard`
            img.src          = element.images[0]
    
            anchor.append( img, p1, p2 )
    
            fragment.appendChild(anchor)
        });
    
        contenedorCards.appendChild(fragment)
    },

    getIdEnlaceCliqueado: (e)=>{ 
        if      (e.target.localName == "img") return (e.target.parentNode.id) 
        else if (e.target.localName == "p")   return (e.target.parentNode.id)
        else if (e.target.localName == "a")   sreturn (e.target.id)
        else return false
    },

    hideLoadinIcon: ()=>{
        const loadingIcon = document.getElementById("loadingIcon")
        loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
    }
}