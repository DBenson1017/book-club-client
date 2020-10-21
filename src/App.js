import React from 'react';
// import ReactDom from 'react-dom'
import './App.css';
import {Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser, createUser, getUser} from './actions'
import { Divider } from 'semantic-ui-react'

import Search from './Containers/Search'
import Users from './Containers/Users'
import Credentials from './Containers/Credentials'
import Profile from './Containers/Profile'
import Books from './Containers/Books'
import Library from './Containers/Library'
import NavBar from './Components/NavBar'


class App extends React.Component {

  makeUser=(data)=>{
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
    .then(data => {
      console.log(data)
      this.props.history.push('/search')
      this.props.createUser(data)
      localStorage.setItem('user_id', data.id)
    })
}
  componentDidMount=()=>{
    const userId = localStorage.getItem("user_id")
    if (userId !== undefined){
          this.props.getUser(userId)
    } else {
      this.props.history.push('/')
    }
}
  render(){
    console.log(this.props.state)
    return (
      <>
      <div>
      <NavBar />
      <Divider horizontal>'Never trust anyone who has not brought a book with them'</Divider>
      </div>
      <div>
      <Route exact path='/' render={()=>
      <Credentials makeUser={this.makeUser}/>} />
      <Route path='/search' render={()=> <Search makeBook={this.makeBook}/>} />
      <Route path='/profile' render={()=> <Profile />} />
      <Route path='/recommendations' render={()=> <Users currentUser={this.props.state.currentUser} />} />
      <Route path='/books' render={()=> <Books />} />
      <Route path='/library' render={()=> <Library />} />
      </div>
    </>
    );
  }
}

const msp=(state)=>{
  console.log('Redux state', state)
  return {state: state}
}

const mdp=(dispatch)=>{
  return {
    setUser: ()=> dispatch(setUser()),
    createUser: (data)=>dispatch(createUser(data)), 
    getUser: (userId)=>dispatch(getUser(userId))
  }
}

export default withRouter(connect(msp, mdp)(App))
