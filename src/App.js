import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: null,
      gender: null,
      loaded:0
    }
  }
  onChangeHandler=event=>{
    this.setState({
      selectedPhoto: event.target.files[0],
      loaded: 0,
    })
  }
  handleGenderChange=event=>{
    this.setState({
      gender: event.target.value
    })
  }
  onClickHandler = () => {
    if(this.state.gender == null){
      alert("Please choose the gender");
      return;
    }
    if(this.state.selectedPhoto == null){
      alert("Please choose a photo");
      return;
    }
    const data = new FormData() 
    data.append('file', this.state.selectedPhoto)
    axios.post(`http://localhost:8000/upload/${this.state.gender}`, data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
      })
    }
    })
    .then(res => {
      console.log(res.statusText)
    })
  }

  render(){
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 id="title">Upload Photo</h3>
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <input type="file" className="form-control" name="photo" accept="image/*" onChange={this.onChangeHandler}/>
              </div>
            </form>
            <div className="gender-group">
              <input type="radio" name="gender" value="male" onChange={this.handleGenderChange}/> Male <br/>
              <input type="radio" name="gender" value="female" onChange={this.handleGenderChange}/> Female <br/>
            </div>
            <ProgressBar now={this.state.loaded} label={`${this.state.loaded}%`} />
            <br/>

            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
