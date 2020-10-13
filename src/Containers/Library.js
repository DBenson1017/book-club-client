import React from 'react';
import {connect} from 'react-redux'
import BookCard from '../Components/BookCard'


class Library extends React.Component{


    generateBooks=()=>{
        return (this.props.state.current_user.books.map(book=> 
            <BookCard book={book} user_id={this.props.state.current_user.id} /> ))

    }

    render(){
        return(
            <>
            {this.props.state.current_user?
            this.generateBooks():
            <h3>Loading...</h3>
            }
            </>

        )
    }

}

const msp=(state)=>{
    console.log('Redux state', state)
    return {state: state}
  }

export default connect(msp)(Library)