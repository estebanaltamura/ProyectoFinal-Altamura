const  title = document.getElementById("tituloProducto")
const  price = document.getElementById("precioProducto")
const  descripcion = document.getElementById("descripcion")
const  carrousel = document.getElementById("carrousel1")



export const productPrinting = (product)=>{
    title.textContent       = product.name
    price.textContent       = product.price
    descripcion.textContent = product.longDescription
    carrousel.setAttribute("src", product.images[0])
    
}

