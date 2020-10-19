import React from 'react';
import {connect} from 'react-redux'
import UserCard from '../Components/UserCard'
import {fetchUsers} from '../actions'


class Users extends React.Component {

    componentDidMount=()=>{
        this.props.fetchUsers()
    }

    
    generateUserCards=()=>{
       return  this.props.users.map((user) => <UserCard user={user} currentUser={this.props.currentUser}/>)
    }

    render(){
        return(
           <>
           {this.props.users?
            this.generateUserCards()
            :
            <h2>Loading...</h2>
        }
           </>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log('Redux state', state)
    return {users: state.users}
}

const mapDispatchToProps=(dispatch)=>{
    return {fetchUsers: ()=> dispatch(fetchUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
// export default Friends 