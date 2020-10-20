import React from 'react';
import {connect} from 'react-redux'
import {setUser, createUser} from '../actions'
import ReadUser from '../Components/ReadUser'


class Profile extends React.Component{
    state={
        first_name:'',
        last_name:'',
        email:'',
        username:''
    }

submitHandler=(data)=>{
    let url = 'http://localhost:3000/users/'
    let id = this.props.current_user.id
    console.log(id)
    console.log(data)
    let options = {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(url+id, options)
        .then(resp=> resp.json())
        .then(data=> this.props.createUser(data))
}

// componentDidMount=()=>{
//     // this.props.setUser()
// }

render(){
    console.log(this.props.current_user)
    return(
        <>
            {this.props.current_user? 
            <div id='profile'> 
            <ReadUser current_user={this.props.current_user} editUser={this.submitHandler}/>
            </div>    
            :<h2>loading</h2>}
        </>
    )
}
}

const msp=(state)=>{
    console.log(state)
    return {current_user: state.current_user}
}

const mdp=(dispatch)=>{
    return {
        setUser: ()=> dispatch(setUser()),
        createUser: (data)=>dispatch(createUser(data))
    }
}

export default connect(msp, mdp)(Profile)

