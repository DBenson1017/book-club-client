import React from 'react';

class BookCard extends React.Component{

    render(){
        return(
            <>
            {this.props.book? 
            <div>
                <p>{this.props.book.title}</p>
                <p>{this.props.book.author }</p>
            </div>
            :
            <h2>Loading...</h2>   
        }
       
            </>
        )
    }

}

export default BookCard