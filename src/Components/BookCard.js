import React from 'react';
import Note from '../Components/Note'
import Review from '../Components/Review'
import { Card, Icon, Image, Button, Container, Grid, Header, Input, Divider } from 'semantic-ui-react'

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
            addNote: !this.state.addNote
        })
    }
    showReviewField=()=>{
        this.setState({ 
            addReview: !this.state.addReview
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
            this.showNoteField()
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
            this.showReviewField()
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

    deleteBookFromLibrary=()=>{
        const joins = this.props.book.book_users
        console.log(joins)
        let join = joins.find(join => join.book_id === this.props.book.id && join.user_id === this.props.user_id)
        let baseUrl = 'http://localhost:3000/book_users/'
        let id = join.id 
        let options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }}
        fetch(baseUrl+id, options)
        .then(resp=> console.log(resp))
        .then(this.props.setUser())
    }
    render(){
        return(
            <>
            {this.props.book?   
            <Container className='book-card'> 
            <Divider id='library-divider' horizontal>{this.props.book.title}</Divider>
                        <Header textAlign='center' as='h2'>{this.props.book.title}</Header>
                        <Header textAlign='center' as='h3'>{this.props.book.author }</Header>
                 <Grid columns={2}>
                    <Grid.Column textAlign='center'> 
                    <Card centered background-color='#f8edeb'>
                        <Image src={this.props.book.img}  href={this.props.book.link} target='_blank'/>
                    </Card>
                    <Button animated='arrow right' onClick={this.showNoteField}>
                            <Button.Content visible><Icon name='write'/></Button.Content>
                            <Button.Content hidden>Add a note</Button.Content>  
                        </Button>
                        <Button color='#f8edeb' animated='arrow right' onClick={this.showReviewField}>
                            <Button.Content visible><Icon name='star'/></Button.Content>
                            <Button.Content hidden>Add a review</Button.Content>  
                        </Button>
                        <Button animated='arrow right' onClick={this.deleteBookFromLibrary}>
                            <Button.Content visible><Icon name='delete'/></Button.Content>
                            <Button.Content hidden>Remove Book</Button.Content>  
                        </Button> 
                    </Grid.Column>
                    <Grid.Column id='book-card-info' textAlign='center'>
                    {this.state.notes.length>0 ? 
                    <h3>{this.generateNote()}</h3>:<h3>Add your first note!</h3>}
                    {/* {this.state.reviews.length>0 ? 
                    <h3>{this.generateReview()}</h3>:<h3>no reviews yet</h3>} */}
                    </Grid.Column>
                </Grid>
            </Container>
                :
                null 
            }
                <Container className='pop-form'>
            {this.state.addNote?        
                <form className='add-form' onSubmit={this.noteSubmit}>
                <Input fluid onChange={this.changeHandler} name='note_content' placeholder='enter note' type='text' value={this.state.note_content}/><br></br>                  
                <input type='submit' value='Submit'/>
                </form>
                :
                null}
            </Container>
            <Container className='pop-form'>
            {this.state.addReview?
                <form className='add-form' onSubmit={this.reviewSubmit}>
                <Input fluid onChange={this.changeHandler} name='review_content' placeholder='add a review' type='text' value={this.state.review_content}/><br></br>
                <Input fluid onChange={this.changeHandler} name='star_rating' placeholder='how many stars?' type='text' value={this.state.star_rating}/><br></br>                   
                <input type='submit' value='Submit'/>
                </form>:
                null}
            </Container>
        </>)
}
}
export default BookCard

