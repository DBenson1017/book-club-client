import React from 'react';
import Signup from '../Components/Signup'
import Login from '../Components/Login'

class Credentials extends React.Component{

    render(){
        return (
            <div>
                <Signup makeUser={this.props.makeUser}/>
                <Login />
            </div>
        )
    }


}
export default Credentials