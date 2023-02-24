import { collectionsHelper } from "./collectionsHelper.js"

document.addEventListener("DOMContentLoaded", (e)=>{
    collectionsHelper.collectionsDomContentLoaded(e)
}) 

contenedorCards.addEventListener("click",(e)=>{
    collectionsHelper.collectionItemClicked(e)
})

