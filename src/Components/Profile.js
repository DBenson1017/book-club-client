import React from 'react';
import {connect} from 'react-redux'
import {setUser} from '../actions'


class Profile extends React.Component{
    state={
        first_name:'',
        last_name:'',
        email:'',
        username:''
    }

    onClick=()=>{
        //show or hide the edit form 
    }
    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })
}
    submitHandler=(e)=>{
        //Patch fetch with this.state
        //hide the edit form 
        e.preventDefault()
        let url = 'http://localhost:3000/users/'
        let id = this.props.current_user[0]
        let options = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/',
                'accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        fetch((url+id), options)
            .then(resp=> resp.json())
            .then(data=> console.log(data))
    }

    componentDidMount=()=>{
        this.props.setUser()
    }

    render(){
        return(
            <>
            {this.props.current_user ? 
            <div> 
            <h2> Welcome {this.props.current_user[1]}!</h2>               
                <h3>first name: {this.props.current_user[1]} </h3>
                <h3>last name: {this.props.current_user[2]} </h3>
                <h3>email: {this.props.current_user[3]} </h3>
                <h3>username: {this.props.current_user[4]} </h3>
                <button>Edit Profile</button> 

            <form id='edit-profile-form' onSubmit={this.submitHandler}>
                <input onChange={this.changeHandler} name='first_name' placeholder={this.props.current_user[1]} type='text' value={this.state.first_name} /> <br></br>      
                <input onChange={this.changeHandler} name='last_name' placeholder={this.props.current_user[2]} type='text' value={this.state.last_name} /><br></br>       
                <input onChange={this.changeHandler} name='username' placeholder={this.props.current_user[4]} type='text' value={this.state.username}/><br></br>            
                <input onChange={this.changeHandler} name='email' placeholder={this.props.current_user[3]} type='text' value={this.state.email}/><br></br>           
                <input type='submit' value='Submit'/>
            </form>

            </div>    
                : <h2>Please login</h2>}
            </>
        )
    }
}

const msp=(state)=>{
    console.log(state)
    return {current_user: state.current_user}
}

const mdp=(dispatch)=>{
    return {setUser: ()=> dispatch(setUser())}
}

export default connect(msp, mdp)(Profile)

