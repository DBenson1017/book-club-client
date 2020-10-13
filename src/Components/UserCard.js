import React from 'react';

class UserCard extends React.Component{

    render(){
        return(
            <>
            {this.props.user? 
            <div className='user-card'>
                <p>{this.props.user.username}</p>
            </div>
            :
            <h2>Loading...</h2>   
        }
       
            </>
        )
    }

}

export default UserCard