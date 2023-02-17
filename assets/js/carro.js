import { cartHelper } from "./cartHelper.js"

const contenedorItems = document.getElementById("contenedorItems")

document.addEventListener("DOMContentLoaded",()=>{
    localStorage.removeItem("infoToProductPage") // quitar
    cartHelper.cartDomContentLoaded()
}) 

seguirComprandoButton.addEventListener("click",()=>{
    cartHelper.backToaConvenientPage()
})

contenedorItems.addEventListener("click",(e)=>{
    e.target.className == "removeIcon" && cartHelper.removeItemCart(e)
    e.target.className == "moreQuantityIcon" && cartHelper.moreQuantityItemCart(e)
    e.target.className == "lessQuantityIcon" && cartHelper.lessQuantityItemCart(e)
})