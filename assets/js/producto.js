import {getProducts} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"

const botonATC = document.getElementById("botonATC")

document.addEventListener("DOMContentLoaded", async (e)=>{
    const productAndCollectionFounded = await getData(e)
    productPrinting(productAndCollectionFounded[0])
})  

botonATC.addEventListener("click", async(e)=>{
    const productAndCollectionFounded = await getData(e)
    console.log(productAndCollectionFounded[0].imagen)
    localStorage.setItem("lastProductAdded", JSON.stringify({
        "idProduct" : productAndCollectionFounded[0].id,
        "colectionName" : productAndCollectionFounded[1],
        "imagen" : productAndCollectionFounded[0].images[0],
        "nombre" : productAndCollectionFounded[0].name,
        "precio" : productAndCollectionFounded[0].price,
        "cantidad" : 1
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