import React from 'react';

class Review extends React.Component {

    state={
        edit: false,
        review_content: null,
        star_rating: null
    }

    changeHandler=(e)=>{
        this.setState({
        [e.target.name]: e.target.value
    })
    }

    showEditForm=()=>{
        this.setState({
            edit: true,
        })
    }

    dataManager=(e)=>{
        e.preventDefault()
        let data = {}
        if (this.state.review_content){
            data.review_content = this.state.review_content
        }
        if (this.state.star_rating){
            data.star_rating= this.state.star_rating
        }
        this.submitHandler(data)
    }

    submitHandler=(data)=>{
        console.log(this.state.review_content)
        let baseUrl = 'http://localhost:3000/reviews/'
        let id = this.props.review.id

        let options = {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)}
        fetch(baseUrl+id , options)
            .then(resp=>resp.json())
            .then(data=> console.log(data))
        }
    
        deleteReview=()=>{
        let baseUrl = 'http://localhost:3000/reviews/'
        let id = this.props.review.id
        let options = {
            method: 'DELETE', 
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }
        fetch(baseUrl+id , options)
        //re-render
        }

    render(){
        return(
            <div className='review'>
            <h2>Stars: {this.props.review.star_rating}</h2>
            <h2>{this.props.review.review_content}</h2>
            <button onClick={this.showEditForm}>Edit Review</button>
            <button onClick={this.deleteReview}>Delete Review</button>

            {this.state.edit?
            <form className='edit-form' onSubmit={this.dataManager}>
            <input onChange={this.changeHandler} name='review_content' placeholder={this.props.review.review_content} type='text' value={this.state.review_content}/><br></br>
            <input onChange={this.changeHandler} name='star_rating' placeholder={this.props.review.star_rating} type='text' value={this.state.star_rating}/><br></br>                    
            <input type='submit' value='Submit'/>
            </form>:
            null}
            </div>
        )
    }

}

export default Review 