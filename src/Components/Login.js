import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions'

class Login extends React.Component {

    state={
        username: '',
        password_digest:''
    }

    changeHandler=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler=(e)=>{
        console.log('cleard heard in Login submitHandler', this.state)
        e.preventDefault()
        //call function to auth#create
    }

    render(){
        return(
            <form id='login' onSubmit={this.submitHandler}>
                <input onChange={this.changeHandler} name='username' placeholder='Username' type='text' value={this.state.username} /> <br></br>       
                <input onChange={this.changeHandler} name='password_digest' placeholder='Password' type='text' value={this.state.password} /> <br></br>    
                <input type='submit' value='login' />
            </form>
            
            )
        }
    }
    
    
    
const msp=(state)=>{
    console.log(state)
    return {state: state}
}

const mdp=(dispatch)=>{
    return {fetchUsers: ()=> dispatch(fetchUsers())}
}

export default connect(msp, mdp)(Login)