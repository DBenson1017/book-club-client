import React from 'react';
import ReactDom from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Search from './Containers/Search'
import Friends from './Containers/Friends'

class App extends React.Component {


  makeBook=(data)=>{
    // gets data from Results and performs POST request
    console.log('click heard by makeBook in App', data)
    let options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://localhost:3000/books', options)
    .then(resp=> resp.json())
    .then(newBook => console.log(newBook))
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Search makeBook={this.makeBook}/>
          <Friends path='/community' />
        </header>
      </div>
    );
  }


}
export default App;
