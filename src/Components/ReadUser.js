import React from 'react';

class ReadUser extends React.Component{

    state={
        edit: false, 
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    }

    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })
    }

    showEditForm=()=>{
        this.setState({
            edit: true,
        })
    }

    dataManager=(e)=>{
        e.preventDefault()
        let data = {}
        if (this.state.first_name){
            data.first_name = this.state.first_name
        }
        if (this.state.last_name){
            data.last_name= this.state.last_name
        }
        if (this.state.username){
            data.username= this.state.username
        }
        if (this.state.email){
            data.email = this.state.email
        }
        this.submitHandler(data)
    }

    submitHandler=(data)=>{
        // e.preventDefault()
        // console.log('click heard in submitHandler (ReadUser)')
        // console.log( parseInt(this.props.current_user[0]) )
        console.log(data)

        let baseUrl = 'http://localhost:3000/users/'
        let id = parseInt(this.props.current_user[0])

        let options = {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:3000/users/3', options)

    }

    deleteUser=()=>{
        //make delete request
    }

    render(){
        console.log('ReadUSer props', this.props)
        return(
            <> 
            {this.props.current_user?
            <div>
                <h2> Welcome {this.props.current_user[1]}!</h2>               
                <h3>first name: {this.props.current_user[1]} </h3>
                <h3>last name: {this.props.current_user[2]} </h3>
                <h3>email: {this.props.current_user[3]} </h3>
                <h3>username: {this.props.current_user[4]} </h3>
                <button onClick={this.showEditForm}>Edit Profile</button> 
                <button onClick={this.deleteUser}>Delete Profile</button> 
            </div>
            :
            <h3>loading... please login</h3>               
            }
            {this.state.edit ? 
            <form id='edit-profile-form' onSubmit={this.dataManager}>
                <input onChange={this.changeHandler} name='first_name' placeholder={this.props.current_user[1]} type='text' value={this.state.first_name} /> <br></br>      
                <input onChange={this.changeHandler} name='last_name' placeholder={this.props.current_user[2]} type='text' value={this.state.last_name} /><br></br>       
                <input onChange={this.changeHandler} name='username' placeholder={this.props.current_user[4]} type='text' value={this.state.username}/><br></br>            
                <input onChange={this.changeHandler} name='email' placeholder={this.props.current_user[3]} type='text' value={this.state.email}/><br></br>           
                <input type='submit' value='Submit'/>
            </form>
            :
            null 
            }
            </>
        )
    }
}

export default ReadUser