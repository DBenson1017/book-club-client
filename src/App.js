import React from 'react';
import ReactDom from 'react-dom'
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'

import Search from './Containers/Search'
import Users from './Containers/Users'
import Credentials from './Containers/Credentials'
import Profile from './Containers/Profile'

class App extends React.Component {

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
    .then(newBook => console.log(newBook))
  }

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

  render(){
    return (
      <header className="App-header">
          <Route path='/credentials' render={()=>
          <Credentials makeUser={this.makeUser}/>} />
          <Route path='/search' render={()=> <Search makeBook={this.makeBook}/>} />
          <Route path='/profile' render={()=> <Profile />} />
          <Route path='/users' render={()=> <Users />} />
        </header> 
    );
  }


}
export default App;
