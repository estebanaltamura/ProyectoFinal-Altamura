import {getProducts} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"
import { productHelper } from "./productHelper.js"

const botonATC = document.getElementById("botonATC")
const botonComprar = document.getElementById("botonComprar")

document.addEventListener("DOMContentLoaded", async (e)=>{
    productHelper.productDomContentLoaded(e)

})  

botonATC.addEventListener("click", (e)=>{
    productHelper.addToCartClicked(e)
})

botonComprar.addEventListener("click", async(e)=>{
    productHelper.buyItNowClicked(e)
})


