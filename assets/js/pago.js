const objectToMPContainer = document.getElementById("objectToMPContainer")
const seguirComprandoButton = document.getElementById("seguirComprandoButton")


document.addEventListener("DOMContentLoaded", ()=>{
    const cartItemAdded = JSON.parse(localStorage.getItem("cartItemsAdded"))
    const fragment = document.createDocumentFragment()

    console.log(typeof (cartItemAdded))
    
    cartItemAdded.forEach(element=>{
        console.log(element)
        const p = document.createElement("P")
        p.textContent = JSON.stringify(element)
        fragment.appendChild(p)
    })
    objectToMPContainer.appendChild(fragment)
    

     
})

seguirComprandoButton.addEventListener("click", ()=> history.go(-2))



