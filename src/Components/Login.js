import React from 'react';
import {connect} from 'react-redux';

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
                <input onChange={this.changeHandler} name='username' placeholder='username' type='text' value={this.state.username} />        
                <input onChange={this.changeHandler} name='password_digest' placeholder='password' type='text' value={this.state.password} />     
                <input type='submit' value='login' />
            </form>
            
            )
        }
    }
    
    
    
const msp=(state)=>{
    console.log(state)
    return {state: state}
}

export default connect(msp)(Login)