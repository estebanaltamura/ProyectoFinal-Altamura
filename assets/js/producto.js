import {getProducts} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"

const botonATC = document.getElementById("botonATC")

document.addEventListener("DOMContentLoaded", async (e)=>{
    const  footer           = document.getElementById("footer")
    const  main             = document.getElementById("main")
    const  loadingIcon      = document.getElementById("loadingIcon")

    const productAndCollectionFounded = await getData(e)

    loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
    footer.classList.replace("hidden", "_")
    main.classList.replace("hidden", "containerGridsProduct")

    productPrinting(productAndCollectionFounded[0])
})  

botonATC.addEventListener("click", async(e)=>{
    const productAndCollectionFounded = await getData(e)
    
    localStorage.setItem("lastProductAdded", JSON.stringify({
        "idProduct"         : productAndCollectionFounded[0].id,
        "colectionName"     : productAndCollectionFounded[1],
        "mainImage"         : productAndCollectionFounded[0].images[0],
        "name"              : productAndCollectionFounded[0].name,
        "price"             : productAndCollectionFounded[0].price,
        "shortDescription"  : productAndCollectionFounded[0].shortDescription,
        "quantity": 1
    }));
    window.location.href = `../pages/cart.html` 
})


const getData = async (e)=>{
    const completeData = await getProducts()
    const completeDataHandled = completeData[0]
    const claves = Object.keys(completeDataHandled)

    const getIdProduct = (e)=> {
        const url = e.target.baseURI
        const inicioCadenaaExtraer = url.lastIndexOf("=")+1
        return url.slice(inicioCadenaaExtraer)
    }

    let productAndCollectionFounded = [];

    claves.forEach(clave=>{
        completeDataHandled[clave].forEach(producto=>{
            if (getIdProduct(e) == producto.id) productAndCollectionFounded = [producto, clave]
            
        })
    })
        
    return productAndCollectionFounded
} 