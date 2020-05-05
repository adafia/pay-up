import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    selectedFile: null
  }

  onChangeHandler = (event) => {
  
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    })
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)

    axios.post("http://localhost:5000/upload", data, { 
      // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
        console.log(res.statusText)
    })
      
  }

  render () {
    return (
      <div className="container">
        <form method="post" action="#" id="#">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" onChange={this.onChangeHandler} multiple=""/>
            </div>
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        </form>
      </div>
    )
  }
}

export default App;
