export const collectionsPrinting = (productosByColeccion)=>{
    const fragment = document.createDocumentFragment("")
    const contenedorCards = document.getElementById("contenedorCards")
    
    productosByColeccion.forEach((element, i)=> {
        const anchor   = document.createElement("a")
        const img      = document.createElement("img")
        const p1       = document.createElement("p")
        const p2       = document.createElement("p")

        anchor.className =`card card${i+1}`
        anchor.id        =`${element.id}`
        
        p1.className     = `tituloCard${i+1} tituloCard`
        p1.textContent   = element.name
        
        p2.className     = `precioCard${i+1} precioCard`
        p2.textContent   = `$ ${element.price}`

        img.className    = `imagenCard${i+1} imagenCard`
        img.src          = element.images[0]

        anchor.append( img, p1, p2 )

        fragment.appendChild(anchor)

        
    });

    contenedorCards.appendChild(fragment)
}

