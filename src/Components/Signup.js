import React from 'react';

class Signup extends React.Component{
    
    state={
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        password_digest:''
}
    submitHandler=(e)=>{
        e.preventDefault()
        this.props.makeUser(this.state)
}
    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })
}
    render(){
        return (
            <form id='sign-up' onSubmit={this.submitHandler}>
            <input onChange={this.changeHandler} name='first_name' placeholder='First Name' type='text' value={this.state.first_name} /> <br></br>      
            <input onChange={this.changeHandler} name='last_name' placeholder='Last Name' type='text' value={this.state.last_name} /><br></br>       
            <input onChange={this.changeHandler} name='username' placeholder='Username' type='text' value={this.state.username}/><br></br>            
            <input onChange={this.changeHandler} name='email' placeholder='Email' type='text' value={this.state.email}/><br></br>           
            <input onChange={this.changeHandler} name='password' placeholder='Password' type='text' value={this.state.password}/><br></br>
            <input type='submit' value='Submit'/>
        </form>
        )
    } 


}
export default Signup