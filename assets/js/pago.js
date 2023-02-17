const spanInfoParaMp = document.getElementById("spanInfoParaMp")
const seguirComprandoButton = document.getElementById("seguirComprandoButton")


document.addEventListener("DOMContentLoaded", ()=>{
    spanInfoParaMp.textContent = localStorage.getItem("cartItemsAdded")
})

seguirComprandoButton.addEventListener("click", ()=> window.location.href = "/index.html")



