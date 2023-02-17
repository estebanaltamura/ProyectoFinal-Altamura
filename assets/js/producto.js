import {getProducts} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"

const botonATC = document.getElementById("botonATC")



document.addEventListener("DOMContentLoaded", ()=>{
    const productInfo = JSON.parse(localStorage.getItem("infoToProductPage"))
    const {idProduct, colectionName} = productInfo

    const getData = async (colectionName, idProduct)=>{
        const products = await getProducts()
        const productosByColeccion = products[colectionName]
        const indexofIdProduct = productosByColeccion.findIndex(element=>element.id==idProduct)
        const producto = productosByColeccion[indexofIdProduct]
        
        productPrinting(producto)
    } 

    getData(colectionName, idProduct)


     
    
}) 


botonATC.addEventListener("click",()=>{
    
    localStorage.setItem("lastProductAdded", localStorage.getItem("infoToProductPage"));
    localStorage.removeItem("infoToProductPage")
    
    window.location.href = `../pages/carro.html` 
})



