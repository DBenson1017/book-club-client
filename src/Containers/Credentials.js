import React from 'react';
import {connect} from 'react-redux'
import {setUser, createUser, getUser} from '../actions'
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import { Grid, Segment, Divider, Button, Container } from 'semantic-ui-react'

class Credentials extends React.Component{

    logoutUser=()=>{
        console.log('logoutUser', localStorage)
        localStorage.clear()
        console.log('logoutUser', localStorage)
    }

    render(){
        return (
            <>
            <Segment>
                <Grid columns={2} stackable textAlign='center'>
                    <Grid.Column>
                        <Signup makeUser={this.props.makeUser}/>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle'>
                        <Login />
                    </Grid.Column>
                </Grid>
                <Divider vertical>OR</Divider>
            </Segment>
                <Container textAlign='center'>
                <Button onClick={this.logoutUser} >Logout</Button>
                </Container>
            </>
        )
    }
}

const msp=(state)=>{
    console.log('Redux state', state)
    return {state: state}
  }
  
  const mdp=(dispatch)=>{
    return {
      setUser: ()=> dispatch(setUser()),
      createUser: (data)=>dispatch(createUser(data)), 
      getUser: (userId)=>dispatch(getUser(userId))
    }
  }
  
  export default connect(msp, mdp)(Credentials)