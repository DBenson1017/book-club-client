import React from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react'

class PublicReview extends React.Component {

    addBookToLibrary=()=>{
        console.log('entered addBookToLibrary')
        let data = {
          book_id: this.props.review.book_id, 
          book_title: this.props.review.book_title, 
          user_id: this.props.currentUser.id
        }
        let options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify(data)
        }
        fetch('http://localhost:3000/book_users', options)
          .then(resp=> resp.json())
          .then(data => {
            console.log(data)
            // this.props.history.push('/library')
          })
      }

    generateStars=()=>{
        if (this.props.review.stars === '1'){
            return <Icon name='star'/>
        } else if (this.props.review.stars === '2'){
            return <p><Icon name='star'/><Icon name='star'/></p>
        } else if (this.props.review.stars === '3'){
            return <p><Icon name='star'/><Icon name='star'/><Icon name='star'/></p>
        } else if (this.props.review.stars === '4'){
            return <p><Icon name='star'/><Icon name='star'/><Icon name='star'/><Icon name='star'/></p>
        } else if (this.props.review.stars === '5'){
            return <p><Icon name='star'/><Icon name='star'/><Icon name='star'/><Icon name='star'/><Icon name='star'/></p>
        }}

    render(){
        return (
            <Segment>
                <p>"{this.props.review.book_title}"</p>
                {this.generateStars()}
                <p>"{this.props.review.content}"  - {this.props.user.username}</p>
                <Button circular onClick={this.addBookToLibrary}>Add book to Library</Button>
            </Segment>
        )
    }
}

export default PublicReview

