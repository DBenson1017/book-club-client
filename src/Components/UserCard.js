import React from 'react';

class UserCard extends React.Component {


    render(){
        return (
            <div>
                <h3>{this.props.user.username}</h3>
            </div>
        )
    }


}
export default UserCard