import React from 'react';
import axios from 'axios'
import Results from '../Components/Results'
import {connect} from 'react-redux'

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
    // gets data from Results and performs POST request to /books
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
    console.log('entered addBookToLibrary')
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
      .then(resp=> resp.json())
      .then(data => console.log(data))
  }

    render(){
        // console.log(this.props.state.current_user.id)
        return (
            <div className='container'>
                <form onSubmit={this.submitHandler}> 
                    <div className='form-group'>
                    <input onChange={this.handleChange} type='text'  placeholder='search by book title'/>
                    <button type='submit'>Search</button>
                    </div>
                </form>
                {this.state.results ? this.generateBooks() : <> </> }               
            </div>
        )
    }
}

const msp=(state)=>{
    console.log('Redux state', state)
    return {state: state}
  }

export default connect(msp)(Search)