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

export const setUser=()=>{
    return function(dispatch){
        fetch('http://localhost:3000/users/3')
            .then(resp=> resp.json())
            .then(data=> dispatch({
                type: 'SET_USER',
                payload: [data.id, data.first_name, data.last_name, data.email, data.username]
            }))
    }
}




// export const setUser=()=>{
//     return {type: 'SET_USER', 
//             payload: 3
//     }
// }