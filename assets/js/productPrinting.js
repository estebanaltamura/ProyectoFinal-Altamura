const  title = document.getElementById("tituloProducto")
const  price = document.getElementById("precioProducto")
const  carrousel = document.getElementById("carrousel1")



export const productPrinting = (product)=>{
    product = product[0]
    title.textContent = product.nombre
    price.textContent = product.precio
    carrousel.setAttribute("src", product.imagen)
    
}

