import React from 'react';
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import { Grid, Segment, Divider } from 'semantic-ui-react'

class Credentials extends React.Component{

    render(){
        return (
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
        )
    }


}
export default Credentials