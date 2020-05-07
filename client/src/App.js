import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Table from './table/Table'
import Processed from './table/Processed'

class App extends Component {
  state = {
    selectedFile: null,
    data: null,
    processed: null
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
    }).then(res => { 
        this.setState({
          ...this.state,
          data: res.data
        })
    })
  }

  compute = () => {
    axios.post("http://localhost:5000/compute", this.state.data, {}).then(res => {
      this.setState({
        ...this.state,
        processed: res.data
      })
    })
  }

  approve = () => {
    axios.post("http://localhost:5000/approved", this.state.processed, {}).then(res => {
      console.log(res.statusText)
    })
  }

  render () {
    return (
      <div>
        <div className="row" style={{ marginTop: '40px', marginLeft: '20px'}}>
	        <div className="col-md-2">
            <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" className="form-control" onChange={this.onChangeHandler} multiple=""/>
                </div>
                <button type="button" className="btn btn-warning btn-block" onClick={this.onClickHandler}>Upload</button>
                {
                  this.state.data === null ? '' : <button type="button" className="btn btn-primary btn-block" onClick={this.compute}>Compute Data</button>
                }
                {
                  this.state.processed === null ? '' : <button type="button" className="btn btn-success btn-block" onClick={this.approve}>Approve Changes</button>
                }
                
            </form>
          </div>
          <div className="col-md-5">
          {
            this.state.data === null ? '' : <Table data={this.state.data}/>
          }
          </div>
          <div className="col-md-5">
          {
            this.state.processed === null ? '' : <Processed data={this.state.processed.customerSummaries}/>
          }
          </div>
        </div>
        
      </div>
    )
  }
}

export default App;
