import React from 'react';
import {connect} from 'react-redux'
import BookCard from '../Components/BookCard'
import {setUser} from '../actions'


class Library extends React.Component{

    componentDidMount=()=>{
        this.props.setUser()
    }

    generateBooks=()=>{
        return (this.props.state.current_user.books.map(book=> 
            <BookCard book={book} user_id={this.props.state.current_user.id} setUser={this.props.setUser} /> ))
    }

    render(){
        return(
            <div classnames='library'>
            {this.props.state.current_user?
            this.generateBooks():
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

export default connect(msp, mdp)(Library)