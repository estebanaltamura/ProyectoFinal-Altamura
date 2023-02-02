import {fetchData} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"

const botonATC = document.getElementById("botonATC")

let producto

document.addEventListener("DOMContentLoaded", ()=>{
    const productInfo = JSON.parse(localStorage.getItem("infoToProductPage"))
    const {idProduct, colectionName} = productInfo
    producto = fetchData(colectionName, idProduct)   
    productPrinting(producto)
}) 


botonATC.addEventListener("click",()=>{
    
    localStorage.setItem("ultimoProductoAgregado", localStorage.getItem("infoToProductPage"));
    window.location.href = `../../pages/carro.html` 
})



