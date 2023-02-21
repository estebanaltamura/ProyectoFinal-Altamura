
export const getProducts = async ()=> {
    return fetch('https://63c98161320a0c4c954a3283.mockapi.io/fakeapi').then(response => response.json()) 
  
}


