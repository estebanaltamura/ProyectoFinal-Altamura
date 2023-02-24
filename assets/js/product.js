import { productHelper } from "./productHelper.js"

document.addEventListener("DOMContentLoaded", (e)=>{
    productHelper.productDomContentLoaded(e)
})  

botonATC.addEventListener("click", (e)=>{
    productHelper.addToCartClicked(e)
})

botonComprar.addEventListener("click", (e)=>{
    productHelper.buyItNowClicked(e)
})


