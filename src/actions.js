export const fetchUsers=()=>{
    return function(dispatch){
        fetch('http://localhost:3000/users')
            .then(resp=> resp.json())
            .then(data => dispatch({
                type: 'FETCH_USERS',
                payload: data
            }))
    }
}
export const fetchBooks=()=>{
    return function(dispatch){
        fetch('http://localhost:3000/books')
            .then(resp=>resp.json())
            .then(data=> dispatch({
                type: 'FETCH_BOOKS',
                payload: data
            }))
    }
}
export const createUser=(data)=>{  
    return {
            type: 'CREATE_USER',
            payload: data
            }
}
export const getUser=(userId)=>{
    let baseUrl = 'http://localhost:3000/users/'
    let id = userId 
    return function(dispatch){
        fetch(baseUrl + id)
            .then(resp=> resp.json())      
            .then(data=> dispatch({
                type: 'SET_USER',
                payload: data
            }))
    }
}
export const setUser=(newId)=>{
    let baseUrl = 'http://localhost:3000/users/'
    let id = newId 
    return function(dispatch){
        fetch(baseUrl + id)
            .then(resp=> resp.json())
            .then(data=> dispatch({
                type: 'SET_USER',
                payload: data
            }))
    }
}
export const logoutUser=(data)=>{  
    return {
            type: 'LOGOUT_USER'
            }
}