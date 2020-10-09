import React from 'react';

class Results extends React.Component{

    clickHandler=()=>{
        console.log('click heard in Results', this.props)
        let data={
            etag: this.props.book.id, 
            link: this.props.book.accessInfo.webReaderLink,
            title: this.props.book.volumeInfo.title, 
            author: this.props.book.volumeInfo.authors[0],
            img: this.props.book.volumeInfo.imageLinks.thumbnail, 
            page: this.props.book.volumeInfo.pageCount,
            published: this.props.book.volumeInfo.publishedDate
        }
        console.log(data)
        this.props.makeBook(data)
    }

    
    
    render(){
        console.log('Results props', this.props)
        return (
            <div className='result-card' >
                {this.props.book.volumeInfo.imageLinks.thumbnail ?  <img src={this.props.book.volumeInfo.imageLinks.thumbnail} /> :
                <img  src='http://getwallpapers.com/wallpaper/full/2/1/9/699354-cute-dog-backgrounds-2560x2048-htc.jpg'/>
                }
                <h2>Title: {this.props.book.volumeInfo.title} </h2>
                <h2>Author: {this.props.book.volumeInfo.authors[0]}</h2>
                <h2>{this.props.book.volumeInfo.pageCount} pages</h2>
                <h2>Published Date: {this.props.book.volumeInfo.publishedDate}</h2>
                <button onClick={this.clickHandler}>Add to Library</button> 
            </div>
        )
    }
}


export default Results 


