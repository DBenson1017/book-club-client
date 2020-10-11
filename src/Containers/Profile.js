import React from 'react';
import {connect} from 'react-redux'
import {setUser} from '../actions'
import ReadUser from '../Components/ReadUser'


class Profile extends React.Component{
    state={
        first_name:'',
        last_name:'',
        email:'',
        username:''
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
            <ReadUser current_user={this.props.current_user} />
            </div>    
                : <h2>loading</h2>}
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

