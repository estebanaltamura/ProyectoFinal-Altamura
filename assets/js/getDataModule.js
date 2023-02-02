import {productos} from "./data/productos.js"

//simula un fetch. La idea es traer desde un servidor segun la pagina que corresponda a partir del argumento pasado por la funcion

export const fetchData = (colectionName, id = "all")=>{
    if (id == "all") return productos[colectionName]
    return productos[colectionName].filter(element=>element["id"] == id)
    
    
}