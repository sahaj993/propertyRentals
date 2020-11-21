import React, { Component } from "react";
import '../App.css';
import axios from "axios";

class User extends Component {
  render() {
    return (
      <div>
        <form onSubmit = {(e) => login(e)}>
        <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="name"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function login(e) {
    e.preventDefault();
    let request = {
        name: document.getElementById('exampleInputName1').value,
        email: document.getElementById('exampleInputEmail1').value,
        password: document.getElementById('exampleInputPassword1').value,
    }
    console.log(request);
    axios.post('http://localhost:8000/register', function(err, user){
        if (err){
            console.log('err',err);
        }
        console.log("login successful");
    })
}

export default User;
