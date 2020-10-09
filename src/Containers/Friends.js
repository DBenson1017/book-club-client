import React from 'react';
import {connect} from 'react-redux'
import UserCard from '../Components/UserCard'
import {fetchUsers} from '../actions'


class Friends extends React.Component {

    componentDidMount=()=>{
        this.props.fetchUsers()
    }

    
    generateUserCards=()=>{
       return  this.props.users.map((user) => <UserCard user={user}/>)
    }

    render(){
        console.log(this.props)
        return(
            <div>
              {this.generateUserCards()}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
// export default Friends 