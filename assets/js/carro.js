const seguirComprandoButton = document.getElementById("seguirComprandoButton")
const contenedorItems = document.getElementById("contenedorItems")
const totalCartNumber = document.getElementById("totalCartNumber")

const actualizarCarro = (ultimoProductoAgregado)=>{
    if (localStorage.getItem("productosAgregados")){
        console.log("ho")
        const carroSinActualizar = JSON.parse(localStorage.getItem("productosAgregados"))
        
        localStorage.setItem("productosAgregados", JSON.stringify([...carroSinActualizar,ultimoProductoAgregado]))
    }    
    else{
        localStorage.setItem("productosAgregados", JSON.stringify([ultimoProductoAgregado]))
    }
}


document.addEventListener("DOMContentLoaded",()=>{
    const ultimoProductoAgregado = JSON.parse(localStorage.getItem("ultimoProductoAgregado"))
    actualizarCarro(ultimoProductoAgregado)
    
    const productosAgregados = JSON.parse(localStorage.getItem("productosAgregados"))

    if(productosAgregados !== []){
        seguirComprandoButton.classList.replace("seguirComprandoButtonSinItems","seguirComprandoButton")
        contenedorItems.classList.replace("contenedorItemsOff","contenedorItems")
    }

    productosAgregados.forEach(element=>{
        element.subtotal = element.precio * element.cantidad
    })
    
    pintItems(productosAgregados)
}) 

seguirComprandoButton.addEventListener("click",()=>{
    history.back()
})



const pintItems =(array)=>{

    array.forEach(element=>{
        const fragment = document.createDocumentFragment()

        const divItem               = document.createElement("DIV")

        const imagenCartItemimg     = document.createElement("IMG")
        const tituloCartItemSpan    = document.createElement("SPAN")
        const priceCartItemSpan     = document.createElement("SPAN")
        const quantityCartItemSpan  = document.createElement("SPAN")
        const subTotalCartItemSpan  = document.createElement("SPAN")
    
        divItem.className              = "item"
        imagenCartItemimg.className    = "imagenCartItem"
        tituloCartItemSpan.className   = "tituloCartItem"
        priceCartItemSpan.className    = "priceCartItem"
        quantityCartItemSpan.className = "quantityCartItem"
        subTotalCartItemSpan.className = "subTotalCartItem"

        imagenCartItemimg.setAttribute("src", element.imagen)
        tituloCartItemSpan.textContent   = element.nombre
        priceCartItemSpan.textContent    = element.precio
        quantityCartItemSpan.textContent = element.cantidad
        subTotalCartItemSpan.textContent = element.subtotal 


        divItem.append(imagenCartItemimg, tituloCartItemSpan, priceCartItemSpan, quantityCartItemSpan, subTotalCartItemSpan)

        contenedorItems.insertBefore(divItem, contenedorItems.children[1])
    })

    totalCartNumber.textContent = array.reduce((acumulador, current)=> acumulador + (current.precio*current.cantidad), 0)

}
       
        


