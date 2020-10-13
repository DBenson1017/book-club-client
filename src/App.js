import React from 'react';
import ReactDom from 'react-dom'
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './actions'

import Search from './Containers/Search'
import Users from './Containers/Users'
import Credentials from './Containers/Credentials'
import Profile from './Containers/Profile'
import Books from './Containers/Books'
import Library from './Containers/Library'

class App extends React.Component {

  // makeBook=(data)=>{
  //   // gets data from Results and performs POST request to /books
  //   console.log('click heard by makeBook in App', data)
  //   let options = {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }
  //   fetch('http://localhost:3000/books', options)
  //   .then(resp=> resp.json())
  //   .then(newBook => this.addBookToLibrary(newBook))
  // }

  // addBookToLibrary=(newBook)=>{
  //   console.log('entered addBookToLibrary')
  //   let data = {
  //     book_id: newBook.id, 
  //     book_title: newBook.title, 
  //     user_id: this.props.current_user.id
  //   }
  //   let options = {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'accept': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }
  //   fetch('http://localhost:3000/book_users', options)
  //     .then(resp=> resp.json())
  //     .then(data => console.log(data))
  // }

  makeUser=(data)=>{
    // gets data from Signup and performs POST request to /users
    console.log('click heard by makeUser in App', data)
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/users', options)
    .then(resp=> resp.json())
    .then(newBook => console.log(newBook))
    // shoudl redirect or send new History to profile page? 
  }
  componentDidMount=()=>{
    this.props.setUser()
}

  render(){
    console.log(this.props.state)
    return (
      <header className="App-header">
          <Route path='/credentials' render={()=>
          <Credentials makeUser={this.makeUser}/>} />
          <Route path='/search' render={()=> <Search makeBook={this.makeBook}/>} />
          <Route path='/profile' render={()=> <Profile />} />
          <Route path='/users' render={()=> <Users />} />
          <Route path='/books' render={()=> <Books />} />
          <Route path='/library' render={()=> <Library />} />
        </header> 
    );
  }
}

const msp=(state)=>{
  console.log('Redux state', state)
  return {state: state}
}

// const msp=(state)=>{
//   console.log(state)
//   return {current_user: state.current_user}
// }

const mdp=(dispatch)=>{
  return {setUser: ()=> dispatch(setUser())}
}

export default connect(msp, mdp)(App)
