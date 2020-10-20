import React from 'react';
import { Segment } from 'semantic-ui-react'
import PublicReview from './PublicReview'

class UserCard extends React.Component{

    parceReviews=()=>{
        let reviews = this.props.user.user_reviews
        return reviews.map(review => <PublicReview review={review} user={this.props.user} currentUser={this.props.currentUser}/>) 
    }

    render(){
        return(
            <>
            {this.props.user? 

            <div className='user-card'>
                <p>{this.props.user.username}</p>
                {this.props.user.user_reviews.length>0? 
                <p>{this.parceReviews()}</p>:
                <p>No reviews yet!</p>            
            }
            
            </div>
            :
            <h2>Loading...</h2>   
        }
       
            </>
        )
    }

}

export default UserCard