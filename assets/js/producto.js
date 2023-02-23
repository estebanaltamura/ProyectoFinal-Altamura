import { productHelper } from "./productHelper.js"

document.addEventListener("DOMContentLoaded", async (e)=>{
    productHelper.productDomContentLoaded(e)
})  

botonATC.addEventListener("click", (e)=>{
    productHelper.addToCartClicked(e)
})

botonComprar.addEventListener("click", async(e)=>{
    productHelper.buyItNowClicked(e)
})


