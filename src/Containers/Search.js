import React from 'react';
import Results from '../Components/Results'
import {connect} from 'react-redux'
import { Container, Button, Divider, Input } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {getUser} from '../actions'

class Search extends React.Component{

    state={
        searchTerm:'', 
        results: null
    }

handleChange=(e)=>{
    e.preventDefault()
    console.log(e.target.value)
    this.setState({searchTerm: e.target.value})
    console.log(this.state.searchTerm)
}

submitHandler=(e)=>{
    e.preventDefault()
    console.log(this.state.searchTerm)
    this.searchBooks(this.state.searchTerm)
}

searchBooks=(query)=>{
    console.log('searchBooks for', query)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_BOOKS_KEY}`)
        .then(resp=> resp.json())
        .then(data=> this.setState({results: data.items}))
}
generateBooks=()=>{
    console.log(this.state.results)
    console.log('entered generateBooks')
    return (
        this.state.results.map(book => 
        <Results key={book.index} book={book} makeBook={this.makeBook}/>      
        )
    )
}

makeBook=(data)=>{
    console.log('click heard by makeBook in App', data)
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/books', options)
    .then(resp=> resp.json())
    .then(newBook => this.addBookToLibrary(newBook))
}

addBookToLibrary=(newBook)=>{
    let data = {
      book_id: newBook.id, 
      book_title: newBook.title, 
      user_id: this.props.state.current_user.id
    }
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/book_users', options)
      .then(this.props.history.push('/library'))      
      .then(resp=> resp.json())
      .then(data => console.log(data))
      .then(this.props.getUser(this.props.state.current_user.id))
}

render(){
  return (
    <Container textAlign='center'>
      <form onSubmit={this.submitHandler}> 
          <div className='form-group'>
          <Input onChange={this.handleChange} type='text'  placeholder='search by book title'/>
          <Button type='submit'>Search</Button>
          </div>
      </form>
      
      {this.state.results? 
      <Container>
        <Divider horizontal>click book image to read a sample</Divider>
        {this.generateBooks()}
      </Container>
      : 
      <Container>
        {/* Stretch goal to add a recommendation  */}
      </Container>
      }
    </Container>
  )
}
}

const msp=(state)=>{
    console.log('Redux state', state)
    return {state: state}
}

const mdp=(dispatch)=>{
  return {
      getUser: (userId)=>dispatch(getUser(userId))
  }
}


export default withRouter(connect(msp, mdp)(Search))
