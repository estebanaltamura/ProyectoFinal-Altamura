import { getProducts } from "./getDataModule.js"

export const productHelper = {
    productDomContentLoaded: async (e)=>{
        const productAndCollectionFounded = await productHelperPrivateMethods.getData(e)
        productHelperPrivateMethods.showContentWhenDataisLoaded()
        productHelperPrivateMethods.productPrinting(productAndCollectionFounded[0])
    },


    addToCartClicked: async(e)=>{
        const productAndCollectionFounded = await productHelperPrivateMethods.getData(e)
        productHelperPrivateMethods.addProductToLocalStorage(productAndCollectionFounded)
        window.location.href = `../pages/cart.html` 
    },

    buyItNowClicked: async(e)=>{
        const productAndCollectionFounded = await productHelperPrivateMethods.getData(e)
        productHelperPrivateMethods.addProductToLocalStorage(productAndCollectionFounded)
        const lastProductAdded = productHelperPrivateMethods.getLastProductAdded()
        productHelperPrivateMethods.UpdateCartLocalStorage(lastProductAdded)
        window.location.href = `../pages/payment.html` 
    },

}

const productHelperPrivateMethods = {
    getData: async (e)=>{
        const completeData = await getProducts()
        const completeDataHandled = completeData[0]
        const claves = Object.keys(completeDataHandled)
    
        const getIdProduct = (e)=> {
            const url = e.target.baseURI
            const inicioCadenaaExtraer = url.lastIndexOf("=")+1
            return url.slice(inicioCadenaaExtraer)
        }
    
        let productAndCollectionFounded = [];
    
        claves.forEach(clave=>{
            completeDataHandled[clave].forEach(producto=>{
                if (getIdProduct(e) == producto.id) productAndCollectionFounded = [producto, clave]
                
            })
        })
            
        return productAndCollectionFounded
    },

    showContentWhenDataisLoaded: ()=>{
        const  main             = document.getElementById("main")
        const  footer           = document.getElementById("footer")
        const  loadingIcon      = document.getElementById("loadingIcon")
        main.classList.replace("hidden", "containerGridsProduct")
        footer.classList.replace("hidden", "footer")
        loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
    },

    productPrinting: (product)=>{
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
    },  


    addProductToLocalStorage: (productAndCollectionFounded)=>{
        console.log(productAndCollectionFounded)
        localStorage.setItem("lastProductAdded", JSON.stringify({
            "idProduct"         : productAndCollectionFounded[0].id,
            "colectionName"     : productAndCollectionFounded[1],
            "mainImage"         : productAndCollectionFounded[0].images[0],
            "name"              : productAndCollectionFounded[0].name,
            "price"             : productAndCollectionFounded[0].price,
            "shortDescription"  : productAndCollectionFounded[0].shortDescription,
            "quantity": 1
        }));
    },
    
    getLastProductAdded : ()=> JSON.parse(localStorage.getItem("lastProductAdded")),
    
    UpdateCartLocalStorage : (lastProductAdded)=>{
        if (localStorage.getItem("cartItemsAdded")){
            const carroSinActualizar = JSON.parse(localStorage.getItem("cartItemsAdded"))
            const repetido = carroSinActualizar.findIndex(element=>element.idProduct == lastProductAdded.idProduct)
                
            if (repetido >=0){
                ++carroSinActualizar[repetido].quantity
                const carroActualizado = [...carroSinActualizar]
                localStorage.setItem("cartItemsAdded", JSON.stringify(carroActualizado))
                localStorage.removeItem("lastProductAdded")
            } 
            
            else if(repetido == -1){
                const carroActualizado = [...carroSinActualizar,lastProductAdded]
                localStorage.setItem("cartItemsAdded", JSON.stringify(carroActualizado))
                localStorage.removeItem("lastProductAdded")
            }
        }    
        else{
            localStorage.setItem("cartItemsAdded", JSON.stringify([lastProductAdded]))
            localStorage.removeItem("lastProductAdded")
        }
    },
}