export const cartHelper = {
    cartDomContentLoaded: ()=>{
        
        const lastProductAdded = cartHelperPrivateMethods.getLastProductAdded()

        lastProductAdded && cartHelperPrivateMethods.notification()
        
        lastProductAdded && cartHelperPrivateMethods.UpdateCartLocalStorage(lastProductAdded)

        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        
        if (cartHelperPrivateMethods.hasItems(cartItemsAdded)) {
            
            cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)

            if(window.innerWidth >= 768){
                cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                cartHelperPrivateMethods.printItemHeaderDesktop()
                cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
                cartHelperPrivateMethods.printTotalContainer(cartItemsAdded)                
            }
            else{
                cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)
                cartHelperPrivateMethods.printTotalMobileContainer(cartItemsAdded)
            }
        }
        else cartHelperPrivateMethods.showContentWhenDataisLoaded(cartHelperPrivateMethods.hasItems(cartItemsAdded))
    },

    removeItemCart: (e)=>{
        const idProductRemoveIconClicked = cartHelperPrivateMethods.getIdProduct(e)
        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        const IndexIncartItemsAddedOfItemToRemove = cartHelperPrivateMethods.getIndexOfProductIncartItemsAdded(cartItemsAdded, idProductRemoveIconClicked)
        
        cartHelperPrivateMethods.removeNode(idProductRemoveIconClicked)
        
        cartHelperPrivateMethods.removeItemOfcartItemsAdded(cartItemsAdded, IndexIncartItemsAddedOfItemToRemove)
         
        cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)
            
        cartHelperPrivateMethods.showContentWhenDataisLoaded(cartHelperPrivateMethods.hasItems(cartItemsAdded))
    },

    moreQuantityItemCart : (e) =>{
        const idProductMoreQuantityClicked = cartHelperPrivateMethods.getIdProduct(e)
        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        const IndexIncartItemsAddedofMoreQuantity = cartHelperPrivateMethods.getIndexOfProductIncartItemsAdded(cartItemsAdded, idProductMoreQuantityClicked)
        
        cartHelperPrivateMethods.addQuantityItemInItemsAdded(cartItemsAdded, IndexIncartItemsAddedofMoreQuantity)
                   
        cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)   
        
        cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)
    
        if (cartHelperPrivateMethods.hasItems(cartItemsAdded)){
            if(window.innerWidth >= 768){
                cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                cartHelperPrivateMethods.printItemHeaderDesktop()
                cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
                cartHelperPrivateMethods.printTotalContainer(cartItemsAdded)    
            }
            else{
                cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)
                cartHelperPrivateMethods.printTotalMobileContainer(cartItemsAdded)
            }
        }
    },

    lessQuantityItemCart : (e) =>{
        const idProductLessQuantityClicked = cartHelperPrivateMethods.getIdProduct(e)
        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        const IndexIncartItemsAddedofLessQuantity = cartHelperPrivateMethods.getIndexOfProductIncartItemsAdded(cartItemsAdded, idProductLessQuantityClicked)
              
        cartItemsAdded[IndexIncartItemsAddedofLessQuantity].quantity >0 && cartHelperPrivateMethods.restoreQuantityItemInItemsAdded(cartItemsAdded, IndexIncartItemsAddedofLessQuantity)           
          
        if (cartItemsAdded[IndexIncartItemsAddedofLessQuantity].quantity == 0){
            cartHelperPrivateMethods.removeNode(idProductLessQuantityClicked)
                
            cartHelperPrivateMethods.removeItemOfcartItemsAdded(cartItemsAdded, IndexIncartItemsAddedofLessQuantity)
            
            cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)
            
            cartHelperPrivateMethods.showContentWhenDataisLoaded(cartHelperPrivateMethods.hasItems(cartItemsAdded))
           }
           else{
            cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)
            
            cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)
                       
                
            if (cartHelperPrivateMethods.hasItems(cartItemsAdded)){
                if(window.innerWidth >= 768){
                    cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                    cartHelperPrivateMethods.printItemHeaderDesktop()
                    cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
                    cartHelperPrivateMethods.printTotalContainer(cartItemsAdded)    
                }
                else{
                    cartHelperPrivateMethods.cleanNodesChildrenOfContenedorItems()
                    cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)
                    cartHelperPrivateMethods.printTotalMobileContainer(cartItemsAdded)
                } 
            }  
        }
    },

    backToaConvenientPage : ()=> {
        history.go(-2)
    }
}    

const cartHelperPrivateMethods = {
    //GETS
    getCartItemsAdded : ()=> JSON.parse(localStorage.getItem("cartItemsAdded")),

    getIdProduct : (e)=> e.target.parentNode.id.slice(0),

    getIndexOfProductIncartItemsAdded : (cartItemsAdded, idProductRemoveIconClicked)=> cartItemsAdded.findIndex(element => element.idProduct == idProductRemoveIconClicked),

    getLastProductAdded : ()=> JSON.parse(localStorage.getItem("lastProductAdded")),

    //DOM

    cleanNodesChildrenOfContenedorItems: ()=>{
        const contenedorItems = document.getElementById("contenedorItems")
        contenedorItems.innerHTML= ""
    },

    printItemHeaderDesktop: ()=>{
        const contenedorItems       = document.getElementById("contenedorItems")
        
        const itemHeader            = document.createElement("DIV")
        const productNameHeaderCart = document.createElement("SPAN")
        const priceHeaderCart       = document.createElement("SPAN")
        const quantityHeaderCart    = document.createElement("SPAN")
        const subTotalHeaderCart    = document.createElement("SPAN")
        
        itemHeader.id= "itemHeader"
        
        itemHeader.className            = "itemHeader"
        productNameHeaderCart.className = "productNameHeaderCart"
        priceHeaderCart.className       = "priceHeaderCart"
        quantityHeaderCart.className    = "quantityHeaderCart"
        subTotalHeaderCart.className    = "subTotalHeaderCart"
        
        productNameHeaderCart.textContent = "Product"
        priceHeaderCart.textContent       = "Price"
        quantityHeaderCart.textContent    = "Quantity"
        subTotalHeaderCart.textContent    = "Sub Total"
        
        itemHeader.append(productNameHeaderCart, priceHeaderCart, quantityHeaderCart, subTotalHeaderCart)
        
        contenedorItems.appendChild(itemHeader)
    },
    
    printItemsMobile: (cartItemsAdded)=> {
        const contenedorItems = document.getElementById("contenedorItems")
                            
        cartItemsAdded.forEach((element) =>{
            const divItem               = document.createElement("DIV")
            
            const imagenCartItemimg     = document.createElement("IMG")
            const tituloCartItemSpan    = document.createElement("SPAN")
            const subTituloCartItemSpan = document.createElement("SPAN")
            const descripcion           = document.createElement("P")
            const quantityCartItemSpan  = document.createElement("SPAN")
            const moreQuantityIcon      = document.createElement("IMG")
            const lessQuantityIcon      = document.createElement("IMG")
            const subTotalCartItemSpan  = document.createElement("SPAN")
            const removeIconMobile      = document.createElement("SPAN")
            const line                  = document.createElement("DIV")
                        
            divItem.className               = "itemMobile"
                
            imagenCartItemimg.className     = "imagenCartItem"
            tituloCartItemSpan.className    = "tituloCartItem"
            subTituloCartItemSpan.className = "subTituloCartItem"
            descripcion.className           = "descripcion"
            quantityCartItemSpan.className  = "quantityCartItem"
            moreQuantityIcon.className      = "moreQuantityIcon"
            lessQuantityIcon.className      = "lessQuantityIcon"
            subTotalCartItemSpan.className  = "subTotalCartItem"
            removeIconMobile.className      = "removeIconMobile"
            line.className                  = "line"
                
            divItem.id              = element.idProduct
            moreQuantityIcon.id     = "moreQuantityIcon"
            lessQuantityIcon.id     = "lessQuantityIcon"
            removeIconMobile.id     = "removeIcon"
            
            imagenCartItemimg.setAttribute("src", element.mainImage)

            tituloCartItemSpan.textContent      = element.name
            subTituloCartItemSpan.textContent   = element.shortDescription
            
            lessQuantityIcon.setAttribute("src", "https://i.postimg.cc/pVC2k6qN/lessQuantityIcon.png")
            quantityCartItemSpan.textContent = element.quantity
            moreQuantityIcon.setAttribute("src", "https://i.postimg.cc/Qd9h8xss/moreQuantityIcon.png")
            
            subTotalCartItemSpan.textContent = `$ ${element.subtotal}`
            removeIconMobile.textContent = "Eliminar"
            
            divItem.append(imagenCartItemimg, tituloCartItemSpan, subTituloCartItemSpan, descripcion, quantityCartItemSpan, moreQuantityIcon, lessQuantityIcon, subTotalCartItemSpan, line, removeIconMobile)
            
            imagenCartItemimg.addEventListener("load", ()=>  cartHelperPrivateMethods.showContentWhenDataisLoaded(cartHelperPrivateMethods.hasItems(cartItemsAdded)))

            contenedorItems.appendChild(divItem)
        }) 
    },
    
    printItemsDesktop: (cartItemsAdded)=> {
        const contenedorItems = document.getElementById("contenedorItems")
        
        cartItemsAdded.forEach((element) =>{
            const divItem               = document.createElement("DIV")
    
            const imagenCartItemimg     = document.createElement("IMG")
            const tituloCartItemSpan    = document.createElement("SPAN")
            const priceCartItemSpan     = document.createElement("SPAN")
            const quantityCartItemSpan  = document.createElement("SPAN")
            const moreQuantityIcon      = document.createElement("IMG")
            const lessQuantityIcon      = document.createElement("IMG")
            const subTotalCartItemSpan  = document.createElement("SPAN")
            const removeIcon            = document.createElement("IMG")
        
            divItem.className              = "item"
    
            imagenCartItemimg.className    = "imagenCartItem"
            tituloCartItemSpan.className   = "tituloCartItem"
            priceCartItemSpan.className    = "priceCartItem"
            quantityCartItemSpan.className = "quantityCartItem"
            moreQuantityIcon.className     = "moreQuantityIcon"
            lessQuantityIcon.className     = "lessQuantityIcon"
            subTotalCartItemSpan.className = "subTotalCartItem"
            removeIcon.className           = "removeIcon"
    
            divItem.id              = element.idProduct
            moreQuantityIcon.id     = "moreQuantityIcon"
            lessQuantityIcon.id     = "lessQuantityIcon"
            removeIcon.id           = "removeIcon"
    
            imagenCartItemimg.setAttribute("src", element.mainImage)
            tituloCartItemSpan.textContent   = element.name
            priceCartItemSpan.textContent    = `$ ${element.price}`
            quantityCartItemSpan.textContent = element.quantity
            lessQuantityIcon.setAttribute("src", "https://i.postimg.cc/pVC2k6qN/lessQuantityIcon.png")
            moreQuantityIcon.setAttribute("src", "https://i.postimg.cc/Qd9h8xss/moreQuantityIcon.png")
            subTotalCartItemSpan.textContent = `$ ${element.subtotal}` 
            removeIcon.setAttribute("src", "https://i.postimg.cc/prsRTmpV/icons8-multiply-64.png")
    
            divItem.append(imagenCartItemimg, tituloCartItemSpan, priceCartItemSpan, quantityCartItemSpan, moreQuantityIcon, lessQuantityIcon, subTotalCartItemSpan, removeIcon)
                  
            contenedorItems.insertBefore(divItem, contenedorItems.children[1])

            imagenCartItemimg.addEventListener("load", ()=>  cartHelperPrivateMethods.showContentWhenDataisLoaded(cartHelperPrivateMethods.hasItems(cartItemsAdded)))
        })
    },

    printTotalMobileContainer: (cartItemsAdded)=> {
        
        const contenedorItems       = document.getElementById("contenedorItems")
        const totalContainer        = document.createElement("DIV")
        const totalCartTitle        = document.createElement("SPAN")
        const totalCartNumber       = document.createElement("SPAN")

        totalContainer.className        = "totalCartContainerMobile"
        totalCartTitle.className        = "totalCartTitle"
        totalCartNumber.className       = "totalCartNumber"

        totalCartNumber.id      = "totalCartNumber"

        totalCartNumber.textContent = `$ ${cartItemsAdded.reduce((acumulador, current)=> acumulador + (current.price*current.quantity), 0)}`

        totalContainer.append(totalCartTitle, totalCartNumber)
        
        contenedorItems.appendChild(totalContainer)
    },
    
    printTotalContainer: (cartItemsAdded)=> {
        
        const contenedorItems       = document.getElementById("contenedorItems")
        const totalContainer        = document.createElement("DIV")
        const totalCartTitle        = document.createElement("SPAN")
        const totalCartNumber       = document.createElement("SPAN")

        totalContainer.className        = "totalCartContainer"
        totalCartTitle.className        = "totalCartTitle"
        totalCartNumber.className       = "totalCartNumber"

        totalCartNumber.id      = "totalCart"

        totalCartNumber.textContent = `$ ${cartItemsAdded.reduce((acumulador, current)=> acumulador + (current.price*current.quantity), 0)}`

        totalContainer.append(totalCartTitle, totalCartNumber)
        
        contenedorItems.appendChild(totalContainer)
    },

    removeNode : (idProductRemoveIconClicked)=> {
        const elementToRemove = document.getElementById(idProductRemoveIconClicked)
        elementToRemove.remove(elementToRemove)
    },

    showContentWhenDataisLoaded : (hasItems)=>{
        
        const contenedorItems       = document.getElementById("contenedorItems")
        const pagarConMPButton      = document.getElementById("pagarConMPButton")
        const MPicon                = document.getElementById("MPicon")
        const seguirComprandoButton = document.getElementById("seguirComprandoButton")
        const loadingIcon           = document.getElementById("loadingIcon")
        const footer                = document.getElementById("footer")
    
        if (hasItems){
            contenedorItems.classList.remove("hidden")
            contenedorItems.classList.add("redondeado","contenedorItems") // redondeado
            pagarConMPButton.classList.replace("pagarConMPButtonOff", "pagarConMPButton")
            MPicon.classList.replace("hidden","mercadopagoicono")
            loadingIcon.classList.replace("loadingIcon", "hidden")
            seguirComprandoButton.classList.replace("hidden", "seguirComprandoButtonConItems")
            footer.classList.replace("hidden", "footer")
        }
        else{
            contenedorItems.classList.replace("contenedorItems","hidden")
            loadingIcon.classList.replace("loadingIcon", "hidden") 
            pagarConMPButton.classList.replace("pagarConMPButtonOff", "hidden")
            MPicon.classList.replace("mercadopagoicono","hidden")
            seguirComprandoButton.classList.replace("hidden", "seguirComprandoButtonSinItems")
            footer.classList.replace("hidden", "footer")
        }
    },
    
    //LOCAL STORAGE
    addQuantityItemInItemsAdded : (cartItemsAdded, IndexIncartItemsAddedofMoreQuantity)=> ++cartItemsAdded[IndexIncartItemsAddedofMoreQuantity].quantity,
    
    calcSubTotalPerItemCart : (cartItemsAdded)=>{
        cartItemsAdded.forEach(element=>{
            element.subtotal = element.price * element.quantity
        })
        
        localStorage.setItem("cartItemsAdded", JSON.stringify(cartItemsAdded))
    },

    hasItems : (cartItemsAdded)=>{
        if(cartItemsAdded && cartItemsAdded.length > 0){
            return true
        }
        else if(cartItemsAdded && cartItemsAdded.length == 0){
            return false
        }
        else if(!cartItemsAdded) return false
    },

    removeItemOfcartItemsAdded : (cartItemsAdded, IndexIncartItemsAddedOfItemToRemove)=> cartItemsAdded.splice(IndexIncartItemsAddedOfItemToRemove, 1),

    restoreQuantityItemInItemsAdded : (cartItemsAdded, IndexIncartItemsAddedofMoreQuantity)=> --cartItemsAdded[IndexIncartItemsAddedofMoreQuantity].quantity,
    
    setcartItemsAdded : (cartItemsAdded)=> localStorage.setItem("cartItemsAdded", JSON.stringify(cartItemsAdded)),

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
    //NOTIFICATIONS
    notification: ()=>Toastify({
        text: "Product added",
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "grey",
          width: "500px",
          height: "45"

        },
        onClick: function(){} // Callback after click
      }).showToast()
}

