const objectToMPContainer = document.getElementById("objectToMPContainer")
const seguirComprandoButton = document.getElementById("seguirComprandoButton")


document.addEventListener("DOMContentLoaded", ()=>{
    const cartItemAdded = JSON.parse(localStorage.getItem("cartItemsAdded"))
    const fragment = document.createDocumentFragment()
    
    cartItemAdded.forEach(element=>{
        const p = document.createElement("P")
        const br = document.createElement("BR")
        p.textContent = JSON.stringify(element)
        fragment.append(p, br, br)
    })
    
    objectToMPContainer.appendChild(fragment)
})

seguirComprandoButton.addEventListener("click", ()=> history.go(-2))



