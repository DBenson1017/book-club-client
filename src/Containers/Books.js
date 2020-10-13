import React from 'react';
import {connect} from 'react-redux'
import {fetchBooks} from '../actions'
import BookCard from '../Components/BookCard'

class Books extends React.Component {

    componentDidMount=()=>{
        this.props.fetchBooks()
    }

    generateBookCards=()=>{
        return (
            this.props.books.map(book => <BookCard key={book.index} book={book}/>)
        )
    }

    render(){
        return(
           <>
           {this.props.books?
            this.generateBookCards()
            :
            <h2>Loading...</h2>
        }
           </>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log('Redux state', state)
    return {books: state.books}
}

const mapDispatchToProps=(dispatch)=>{
    return {fetchBooks: ()=>dispatch(fetchBooks())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
// export default Friends 