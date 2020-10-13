import React from 'react';
import Note from '../Components/Note'
import Review from '../Components/Review'

class BookCard extends React.Component{

    state={
        addNote:false, 
        addReview:false, 
        note_content:'',
        review_content:''
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
            star_rating: this.state.star_rating 
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
            .then(data=>console.log(data))
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
            .then(data=>console.log(data))
    }

    generateReview=()=>{
        return this.props.book.reviews.map(review => 
            <Review review={review}/>
        )}
    generateNote=()=>{
            return this.props.book.notes.map(note => 
                <Note note={note}/>
            )}

    render(){
        return(
            <>
            {this.props.book? 
            <div>
                <p>{this.props.book.title}</p>
                <p>{this.props.book.author }</p>
                <button onClick={this.showNoteField}>Add Note</button>
                <button onClick={this.showReviewField}>Add Review</button>
               
                {this.state.addNote?
                <form className='add-form' onSubmit={this.noteSubmit}>
                <input onChange={this.changeHandler} name='note_content' placeholder='enter note' type='text' value={this.state.note_content}/><br></br>                  
                <input type='submit' value='Submit'/>
                </form>:
                null}

                {this.state.addReview?
                <form className='add-form' onSubmit={this.reviewSubmit}>
                <input onChange={this.changeHandler} name='review_content' placeholder='add a review' type='text' value={this.state.review_content}/><br></br>
                <input onChange={this.changeHandler} name='star_rating' placeholder='how many stars?' type='text' value={this.state.star_rating}/><br></br>                   
                <input type='submit' value='Submit'/>
                </form>:
                null}
                
                {this.props.book.reviews.length>0 ? 
                <h3>{this.generateReview()}</h3>:<h3>no reviews yet</h3>}
                {this.props.book.notes.length>0 ? 
                <h3>{this.generateNote()}</h3>:<h3>no notes yet</h3>}

            </div>
            :
            <h2>Loading...</h2>   
        }     
            </>
        )
    }

}

export default BookCard