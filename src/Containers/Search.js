import React from 'react';
import axios from 'axios'
import Results from '../Components/Results'

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
        <Results key={book.index} book={book} makeBook={this.props.makeBook}/>      
        )
   )
}
    render(){
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

export default Search 