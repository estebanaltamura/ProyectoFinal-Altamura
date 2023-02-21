import {getProducts} from "./getDataModule.js"
import { productPrinting } from "./productPrinting.js"

const botonATC = document.getElementById("botonATC")

document.addEventListener("DOMContentLoaded", async (e)=>{
   
    const getData = async (e)=>{
        const completeData = await getProducts()
        const completeDataHandled = completeData[0]
        const claves = Object.keys(completeDataHandled)

        const getIdProduct = (e)=> {
            const url = e.target.baseURI
            const inicioCadenaaExtraer = url.lastIndexOf("=")+1
            return url.slice(inicioCadenaaExtraer)
        }

        let idFounded;

        
        claves.forEach(element=>{
            completeDataHandled[element].forEach(elementx=>{
                if (getIdProduct(e) == elementx.id) idFounded = elementx
                
            })
        })
        
        
        return idFounded
    } 

    const productData = await getData(e)

    productPrinting(productData)
}) 


botonATC.addEventListener("click",()=>{
    localStorage.setItem("lastProductAdded", localStorage.getItem("infoToProductPage"));
    //window.location.href = `../pages/carro.html` 
})



