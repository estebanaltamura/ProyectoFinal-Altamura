export const cartHelper = {
    cartDomContentLoaded: ()=>{
        
        const lastProductAdded = cartHelperPrivateMethods.getLastProductAdded()

        lastProductAdded && cartHelperPrivateMethods.notification()
        
        lastProductAdded && cartHelperPrivateMethods.UpdateCartLocalStorage(lastProductAdded)

        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()

        if (cartHelperPrivateMethods.hasItems(cartItemsAdded)) {
            cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)

            cartHelperPrivateMethods.calcTotalCart(cartItemsAdded)
            
            window.innerWidth >= 768 ?
                cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
                                     :
                cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)


            cartHelperPrivateMethods.showHideContenedorItems(cartHelperPrivateMethods.hasItems(cartItemsAdded))
        }
    },

    removeItemCart: (e)=>{
        const idProductRemoveIconClicked = cartHelperPrivateMethods.getIdProduct(e)
        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        const IndexIncartItemsAddedOfItemToRemove = cartHelperPrivateMethods.getIndexOfProductIncartItemsAdded(cartItemsAdded, idProductRemoveIconClicked)
        
        cartHelperPrivateMethods.removeNode(idProductRemoveIconClicked)
        
        cartHelperPrivateMethods.removeItemOfcartItemsAdded(cartItemsAdded, IndexIncartItemsAddedOfItemToRemove)
         
        cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)
        
        cartHelperPrivateMethods.calcTotalCart(cartItemsAdded)
    
        cartHelperPrivateMethods.showHideContenedorItems(cartHelperPrivateMethods.hasItems(cartItemsAdded))
    },

    moreQuantityItemCart : (e) =>{
        const idProductMoreQuantityClicked = cartHelperPrivateMethods.getIdProduct(e)
        const cartItemsAdded = cartHelperPrivateMethods.getCartItemsAdded()
        const IndexIncartItemsAddedofMoreQuantity = cartHelperPrivateMethods.getIndexOfProductIncartItemsAdded(cartItemsAdded, idProductMoreQuantityClicked)
        
        cartHelperPrivateMethods.addQuantityItemInItemsAdded(cartItemsAdded, IndexIncartItemsAddedofMoreQuantity)
                   
        cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)   
        
        cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)
    
        cartHelperPrivateMethods.calcTotalCart(cartItemsAdded)
    
        if (cartHelperPrivateMethods.hasItems(cartItemsAdded)){
            if(window.innerWidth >= 768){
                cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
            }
            else cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)
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
            
            cartHelperPrivateMethods.calcTotalCart(cartItemsAdded)
            
            cartHelperPrivateMethods.showHideContenedorItems(cartHelperPrivateMethods.hasItems(cartItemsAdded))
           }
           else{
            cartHelperPrivateMethods.setcartItemsAdded(cartItemsAdded)
            
            cartHelperPrivateMethods.calcSubTotalPerItemCart(cartItemsAdded)
                
            cartHelperPrivateMethods.calcTotalCart(cartItemsAdded)
                
            if (cartHelperPrivateMethods.hasItems(cartItemsAdded)){
                if(window.innerWidth >= 768){
                    cartHelperPrivateMethods.printItemsDesktop(cartItemsAdded)
                }
                else cartHelperPrivateMethods.printItemsMobile(cartItemsAdded)
            }        }
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

    calcTotalCart : (cartItemsAdded)=>{
        const totalCartNumber = document.getElementById("totalCartNumber")
        totalCartNumber.textContent = `$ ${cartItemsAdded.reduce((acumulador, current)=> acumulador + (current.price*current.quantity), 0)}`
    },

    cartHeaderHide: (showHide)=>{
        const cartHeader = document.getElementById("itemHeader")
        showHide == true ? cartHeader.className = "itemHeader" : cartHeader.classList.replace("itemHeader", "hidden")
    },

    limpiarNodosItemClass : ()=>{
        const contenedorItems = document.getElementById("contenedorItems")
        
        const elementsToRemove = [...document.getElementsByClassName("item"), ...document.getElementsByClassName("itemMobile")]
        
        if (elementsToRemove.length > 0){
            elementsToRemove.forEach(element=>{
                contenedorItems.removeChild(element)
            })
        }
    },

    printItemsMobile: (cartItemsAdded)=> {
        const contenedorItems = document.getElementById("contenedorItems")
        cartHelperPrivateMethods.limpiarNodosItemClass()
        cartHelperPrivateMethods.cartHeaderHide(false)
        cartHelperPrivateMethods.totalCartContainerClassSwitch()
    
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
        
            divItem.className              = "itemMobile"
    
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
                  
            contenedorItems.insertBefore(divItem, contenedorItems.children[1])
        })
    },

    printItemsDesktop : (cartItemsAdded)=> {
        const contenedorItems = document.getElementById("contenedorItems")
        cartHelperPrivateMethods.limpiarNodosItemClass()
    
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
            priceCartItemSpan.textContent    = element.price
            quantityCartItemSpan.textContent = element.quantity
            moreQuantityIcon.setAttribute("src", "https://i.postimg.cc/pVC2k6qN/lessQuantityIcon.png")
            lessQuantityIcon.setAttribute("src", "https://i.postimg.cc/Qd9h8xss/moreQuantityIcon.png")
            subTotalCartItemSpan.textContent = element.subtotal 
            removeIcon.setAttribute("src", "https://i.postimg.cc/prsRTmpV/icons8-multiply-64.png")
    
            divItem.append(imagenCartItemimg, tituloCartItemSpan, priceCartItemSpan, quantityCartItemSpan, moreQuantityIcon, lessQuantityIcon, subTotalCartItemSpan, removeIcon)
                  
            contenedorItems.insertBefore(divItem, contenedorItems.children[1])
        })
    },

    removeNode : (idProductRemoveIconClicked)=> {
        const elementToRemove = document.getElementById(idProductRemoveIconClicked)
        elementToRemove.remove(elementToRemove)
    },

    showHideContenedorItems : (hasItems)=>{
        const contenedorItems = document.getElementById("contenedorItems")
        const pagarConMPButton = document.getElementById("pagarConMPButton")
        const seguirComprandoButton = document.getElementById("seguirComprandoButton")
        const  loadingIcon      = document.getElementById("loadingIcon")
    
        if (hasItems){
            contenedorItems.classList.replace("contenedorItemsOff","contenedorItems")
            loadingIcon.classList.replace("loadingIcon", "loadingIconOff")
            pagarConMPButton.classList.replace("pagarConMPButtonOff","pagarConMPButton")
            seguirComprandoButton.classList.replace("seguirComprandoButtonSinItems", "seguirComprandoButtonConItems")
        }
        else{
            contenedorItems.classList.replace("contenedorItems","contenedorItemsOff")
            pagarConMPButton.classList.replace("pagarConMPButton", "pagarConMPButtonOff")
            seguirComprandoButton.classList.replace("seguirComprandoButtonConItems", "seguirComprandoButtonSinItems")
        }
    },

    totalCartContainerClassSwitch: ()=>{
        const totalCart = document.getElementById("totalCart")
        totalCart.className = "totalCartContainerMobile"
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
    
    removeInfoToProductPago : ()=> localStorage.removeItem("infoToProductPage"),
    
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
          width: "100%",
          height: "45"

        },
        onClick: function(){} // Callback after click
      }).showToast()
}

