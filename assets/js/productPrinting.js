const  title = document.getElementById("tituloProducto")
const  price = document.getElementById("precioProducto")
const  carrousel = document.getElementById("carrousel1")



export const productPrinting = (product)=>{
    title.textContent = product.nombre
    price.textContent = product.precio
    carrousel.setAttribute("src", product.imagen)
    
}

