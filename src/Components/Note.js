import React from 'react';
import { Icon, Button, Container, Message, Input } from 'semantic-ui-react'

class Note extends React.Component {

    state={
        edit: false,
        note_content:''
    }

    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })
    }

    submitHandler=(e)=>{
    e.preventDefault()
    console.log(this.state.note_content)
    let baseUrl = 'http://localhost:3000/notes/'
    let id = this.props.note.id
    let data={note_content: this.state.note_content}
    let options = {
        method: 'PATCH', 
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)}
    fetch(baseUrl+id , options)
        .then(resp=>resp.json())
        .then(data=> console.log(data))
    }

    deleteNote=()=>{
    let baseUrl = 'http://localhost:3000/notes/'
    let id = this.props.note.id
    let options = {
        method: 'DELETE', 
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    }
    fetch(baseUrl+id , options)
    this.props.remove(id)
    }

    showEditForm=()=>{
        this.setState({
            edit: !this.state.edit,
        })
    }

    render(){
        return(
            <div className='note' >
                <Message>
                    <p>
                    {this.props.note.note_content}
                    </p> 
                </Message>
                <Button basic circular compact onClick={this.showEditForm}><Icon name='edit'/></Button>
                <Button basic circular compact onClick={this.deleteNote}>
                    <Button.Content visible><Icon name='delete'/>
                </Button.Content></Button>

                {this.state.edit?
                <form className='edit-form' onSubmit={this.submitHandler}>
                <Input onChange={this.changeHandler} name='note_content' placeholder={this.props.note.note_content} type='text' value={this.state.note_content}/><br></br>                  
                <input type='submit' value='Submit'/>
                </form>:
                null}
            </div>
        )
    }

}

export default Note 