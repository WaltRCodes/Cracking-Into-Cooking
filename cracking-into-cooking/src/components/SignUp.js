import {Link} from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';


export default class SignUpPage  extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          userName:'',
          password:'',
          message:''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.createUserWithNameAndPasswordHandler = this.createUserWithNameAndPasswordHandler.bind(this);
  }
  

  createUserWithNameAndPasswordHandler = (event) => {
    event.preventDefault();
    
    let user = {
        "userName": this.state.userName,
        "password": this.state.password
    };
    
    this.postApi(user);
    this.setState({message:<p>Congrats, your profile was created successfully</p>});
  };

  onChangeHandler = (event) => {
    //const { name, value } = event.currentTarget;

    if(event.target.name === 'userName') {
        this.setState({userName:event.target.value});
    }
    else if(event.target.name === 'userPassword'){
      this.setState({password:event.target.value});
    }
  };

  async postApi(object) {
    try {
      const response = await axios.post('/walter_api/v2/users',object);
      
      console.log(response.data);
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  };

 
  render() {
    return (
        <div>
          <h1>Sign Up</h1>
          <div>
            {this.state.message}
            <form>
              <label>
                UserName:
              </label>
              <input
                type="text"
                name="userName"
                placeholder=""
                onChange={this.onChangeHandler}
              />
              <label>
                Password:
              </label>
              <input
                type="password"
                name="userPassword"
                placeholder="Your Password"
                onChange={this.onChangeHandler}
              />
              <button onClick={this.createUserWithNameAndPasswordHandler}>
                Sign up
              </button>
            </form>
        
            <Link to="/">Already have an account? Sign in here</Link>
          </div>
        </div>
      );

  }
  
};
