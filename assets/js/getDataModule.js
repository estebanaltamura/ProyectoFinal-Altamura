
export const getProducts = async ()=> {
    return fetch('https://api.jsonstorage.net/v1/json/d6106fdf-e957-4cfe-a8cc-da8e817fc057/748cf268-42ec-44e6-9d72-6ee2cb2fb299').then(response => response.json()) 
  
}


