import React from 'react';

class Review extends React.Component {

    render(){
        return(
            <div className='review'>
            <h2>Stars: {this.props.review.star_rating}</h2>
            <h2>{this.props.review.review_content}</h2>
            </div>
        )
    }

}

export default Review 