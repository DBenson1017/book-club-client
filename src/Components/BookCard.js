import React from 'react';
import Note from '../Components/Note'
import Review from '../Components/Review'
import { Card, Icon, Image, Button, Container, Grid, Header, Reveal } from 'semantic-ui-react'

class BookCard extends React.Component{

    state={
        addNote:false, 
        addReview:false, 
        note_content:'',
        review_content:'', 
        notes: this.props.book.notes, 
        reviews: this.props.book.reviews
    }

    showNoteField=()=>{
        this.setState({ 
            addNote: true
        })
    }
    showReviewField=()=>{
        this.setState({ 
            addReview: true
        })
    }
    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })}
    noteSubmit=(e)=>{
        e.preventDefault()
        let data = {
            user_id: this.props.user_id,
            book_id: this.props.book.id, 
            note_content: this.state.note_content, 
            book_title: this.props.book.title   
        }
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)}
        fetch('http://localhost:3000/notes', options)
            .then(resp=>resp.json())
            .then(data=>this.addNoteToState(data))
    }
    addNoteToState=(note)=>{
        this.setState({notes: [...this.state.notes, note]})
    }
    removeNoteFromState=(id)=>{
        let noteArray = this.state.notes
        let index = noteArray.findIndex(note=> note.id===id)
        delete noteArray[index]
        this.setState({notes: noteArray})
    }

    reviewSubmit=(e)=>{
        e.preventDefault()
        let data = {
            user_id: this.props.user_id,
            book_id: this.props.book.id, 
            book_title: this.props.book.title, 
            review_content: this.state.review_content, 
            star_rating: this.state.star_rating
        }
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)}
        fetch('http://localhost:3000/reviews', options)
            .then(resp=>resp.json())
            .then(data=>this.addReviewToState(data))
    }
    addReviewToState=(review)=>{
        this.setState({reviews: [...this.state.reviews, review]})
    }
    removeReviewFromState=(id)=>{
        let reviewArray = this.state.reviews
        let index = reviewArray.findIndex(review=> review.id===id)
        delete reviewArray[index]
        this.setState({reviews: reviewArray})
    }

    generateReview=()=>{
        return this.state.reviews.map(review => 
            <Review review={review} remove={this.removeReviewFromState}/>
        )}
    generateNote=()=>{
            return this.state.notes.map(note => 
                <Note note={note} remove={this.removeNoteFromState}/>
            )}

    render(){
        return(
            <>
            <Container> 
            {this.props.book?   
                <Grid columns={2}>
                    <Grid.Column> 
                        <Header as='h3'>{this.props.book.title}</Header>
                        <Header as='h3'>{this.props.book.author }</Header>
                        <Image src={this.props.book.img}  href={this.props.book.link} target='_blank'/>
                        <Button onClick={this.showNoteField}>Add Note</Button>
                        <Button onClick={this.showReviewField}>Add Review</Button>
                    </Grid.Column>
                    <Grid.Column>
                    {this.state.notes.length>0 ? 
                    <h3>{this.generateNote()}</h3>:<h3>no notes yet</h3>}
                    {this.state.reviews.length>0 ? 
                    <h3>{this.generateReview()}</h3>:<h3>no reviews yet</h3>}
                    </Grid.Column>
                </Grid>
                :
                null 
            }
            </Container>
            <Container>
            {this.state.addNote?        
                <form className='add-form' onSubmit={this.noteSubmit}>
                <input onChange={this.changeHandler} name='note_content' placeholder='enter note' type='text' value={this.state.note_content}/><br></br>                  
                <input type='submit' value='Submit'/>
                </form>
                :
                null}
            </Container>
            <Container>
            {this.state.addReview?
                <form className='add-form' onSubmit={this.reviewSubmit}>
                <input onChange={this.changeHandler} name='review_content' placeholder='add a review' type='text' value={this.state.review_content}/><br></br>
                <input onChange={this.changeHandler} name='star_rating' placeholder='how many stars?' type='text' value={this.state.star_rating}/><br></br>                   
                <input type='submit' value='Submit'/>
                </form>:
                null}
            </Container>
        </>)
}
}
export default BookCard

