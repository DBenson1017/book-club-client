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

export const setUser=()=>{
    return function(dispatch){
        fetch('http://localhost:3000/users/23')
            .then(resp=> resp.json())
            .then(data=> dispatch({
                type: 'SET_USER',
                payload: data
            }))
    }
}
