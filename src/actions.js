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