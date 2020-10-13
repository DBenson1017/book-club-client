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

    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })}

    noteSubmit=(e)=>{
        e.preventDefault()
        let data = {
            user_id: this.props.user_id,
            book_id: this.props.book.id, 
            note_content: this.state.note_content
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

                {this.state.addNote?
                <form className='add-form' onSubmit={this.noteSubmit}>
                <input onChange={this.changeHandler} name='note_content' placeholder='enter note' type='text' value={this.state.note_content}/><br></br>                  
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