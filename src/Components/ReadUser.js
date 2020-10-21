import React from 'react';
import { Segment, Container, Icon, Input, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'


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
            edit: (!this.state.edit)
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
        this.props.editUser(data)
    }

    deleteUser=()=>{
        // console.log(data)
        let baseUrl = 'http://localhost:3000/users/'
        let id = this.props.current_user.id
        let options = {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }
        fetch(baseUrl+id , options)
        this.props.history.push('/credentials')
        localStorage.clear()
        window.location.reload()
    }

    render(){
        console.log('ReadUSer props', this.props)
        return(
            <> 
            {this.props.current_user?
            <div>
            <Segment textAlign='center' id='welcome'>
            <h2> Welcome {this.props.current_user.first_name}!</h2>               
            </Segment>

            <Segment raised vertical  textAlign='center'>
                <Container >
                <h3>First Name: {this.props.current_user.first_name} </h3>
                <h3>Last Name: {this.props.current_user.last_name} </h3>
                <h3>Email: {this.props.current_user.email} </h3>
                <h3>Username: {this.props.current_user.username} </h3>
                <Button basic circular compact onClick={this.showEditForm}><Icon name='edit'/></Button>
                <Button basic circular compact onClick={this.deleteUser}>
                    <Button.Content visible><Icon name='delete'/>
                </Button.Content></Button>
                </Container>
            </Segment>
            </div>
            :
            <h3>loading... please login</h3>               
            }
            
            {this.state.edit ? 
            <Segment textAlign='center' id='edit-profile'> 
            <form id='edit-profile-form' onSubmit={this.dataManager}>
                <Input onChange={this.changeHandler} name='first_name' placeholder={this.props.current_user.first_name} type='text' value={this.state.first_name} /> <br></br>      
                <Input onChange={this.changeHandler} name='last_name' placeholder={this.props.current_user.last_name} type='text' value={this.state.last_name} /><br></br>       
                <Input onChange={this.changeHandler} name='username' placeholder={this.props.current_user.username} type='text' value={this.state.username}/><br></br>            
                <Input onChange={this.changeHandler} name='email' placeholder={this.props.current_user.email} type='text' value={this.state.email}/><br></br>           
                <input type='submit' value='Submit'/>
            </form>

            </Segment>
            :
            null 
            }
            </>
        )
    }
}

export default withRouter(ReadUser)