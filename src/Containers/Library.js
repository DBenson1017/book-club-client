import React from 'react';
import {connect} from 'react-redux'
import BookCard from '../Components/BookCard'
import {setUser} from '../actions'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'


class Library extends React.Component{

    componentDidMount=()=>{
        console.log(this.props.state.current_user)
        if (!this.props.state.current_user){
            this.props.history.push('/credentials')
        }
    }

    generateBooks=()=>{
        return (this.props.state.current_user.books.map(book=> 
        <BookCard book={book} user_id={this.props.state.current_user.id} setUser={this.props.setUser}/> ))
    }

    render(){
        console.log(this.props.state)
        return(
            <div class='library'>
            {this.props.state.current_user?
                this.props.state.current_user.books.length>0?
                    this.generateBooks():
                    <h3>No books added yet!</h3> 
                    :
                    <h3>Loading...</h3> 
            }
            </div>
        )}
}

const msp=(state)=>{
    console.log('Redux state', state)
    return {state: state}
  }

const mdp=(dispatch)=>{
    return {setUser: ()=> dispatch(setUser())}
}

export default connect(msp, mdp)(withRouter(Library))