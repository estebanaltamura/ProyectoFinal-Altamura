export const productPrinting = (product)=>{
    const  title            = document.getElementById("tituloProducto")
    const  price            = document.getElementById("precioProducto")
    const  descripcion      = document.getElementById("descripcion")
    const  carouselInner    = document.getElementById("carousel-inner")
    
    const fragment = document.createDocumentFragment()

    title.textContent       = product.name
    price.textContent       = `$ ${product.price}`
    descripcion.textContent = product.longDescription

    product.images.forEach((element, index) => {
        const slideContainer = document.createElement("DIV")
        const slideImage = document.createElement("IMG")

        index == 0 ? slideContainer.className = "carousel-item active" : slideContainer.className = "carousel-item"
       
        slideImage.className     = "d-block w-100"
        slideImage.setAttribute("src", element)
        slideImage.setAttribute("alt", "alt a definir")

        slideContainer.appendChild(slideImage)

        fragment.appendChild(slideContainer)
    });
    
    carouselInner.appendChild(fragment)
}  