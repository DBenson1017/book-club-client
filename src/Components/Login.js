import React from 'react';
import {connect} from 'react-redux';
import {createUser} from '../actions'
import {withRouter} from 'react-router-dom'
import { Input } from 'semantic-ui-react'

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
        console.log('click heard in Login submitHandler', this.state)
        e.preventDefault()
        let data = {
            username: this.state.username, 
            password_digest: this.state.password_digest
        }
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:3000/login', options)
            .then(resp=> resp.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/search')
                this.props.createUser(data[0])
                localStorage.setItem('user_id', data[0].id)
            })
    }
    render(){
        return(
            <form id='login' onSubmit={this.submitHandler}>
                <Input onChange={this.changeHandler} name='username' placeholder='Username' type='text' value={this.state.username} /> <br></br>       
                <Input onChange={this.changeHandler} name='password_digest' placeholder='Password' type='text' value={this.state.password} /> <br></br>    
                <Input type='submit' value='login' />
            </form>
            
            )
        }
}

const msp=(state)=>{
    console.log(state)
    return {state: state}
}
const mdp=(dispatch)=>{
    return {
        createUser: (data)=>dispatch(createUser(data))
    }
}

export default withRouter(connect(msp, mdp)(Login))