import { cartHelper } from "./cartHelper.js"

document.addEventListener("DOMContentLoaded",()=>{
    cartHelper.cartDomContentLoaded()
}) 

seguirComprandoButton.addEventListener("click",()=>{
    cartHelper.backToaConvenientPage() 
})

contenedorItems.addEventListener("click",(e)=>{
    if(e.target.className   == "removeIcon"         ||  e.target.className == "removeIconMobile") cartHelper.removeItemCart(e)
    e.target.className      == "moreQuantityIcon"   && cartHelper.moreQuantityItemCart(e)
    e.target.className      == "lessQuantityIcon"   && cartHelper.lessQuantityItemCart(e)
})