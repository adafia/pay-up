import React, { Fragment, Component } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Unprocessed from './Unprocessed'
import Processed from './Processed'

class Tables extends Component {
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
        }).catch(err => {
          toast.error(err.response.data)
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
          toast.success(res.data)
        })
      }

    render() {
        return (
            <Fragment>
                <ToastContainer />
                <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ 'marginTop': '10px' }}>
                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" >Upload</a>
                {
                    this.state.data === null ? '' : <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Review Uploaded Data</a>
                }
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <form method="post" action="#" id="#">
                        {
                            this.state.data !== null ? (
                                <div style={{ 'marginTop': '40px' }}>
                                    <p>Your file has been uploaded</p>
                                    <p>Please navigate to the 'Review Uploaded Data' pane to view the file you uploaded</p>
                                </div> 
                            ):(
                                <Fragment>
                                    <div className="form-group files">
                                    <label>Upload Your File </label>
                                    <input type="file" className="form-control" onChange={this.onChangeHandler} multiple=""/>
                                    </div>
                                    <button type="button" className="btn btn-info btn-block" onClick={this.onClickHandler}>
                                        Upload
                                    </button>
                                </Fragment>
                            )
                        }
                        
                    </form>
                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <div className="row">
                    {
                        this.state.data === null ? 'Please upload a file to review the data' : (
                            <div className="col-md-6">
                                <Unprocessed data={this.state.data}/>
                                <button type="button" className="btn btn-primary btn-block" onClick={this.compute}>Compute Data</button>
                            </div>
                        )
                    }
                    {
                        this.state.processed === null ? '' : (
                            <div className="col-md-6">
                                <Processed data={this.state.processed.customerSummaries}/>
                                <button type="button" className="btn btn-success btn-block" onClick={this.approve}>Approve Changes</button>
                            </div>
                        
                        )
                    }
                    </div>
                </div>
                </div>
            </Fragment>
        )
    }
}


export default Tables;
