import {Link} from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          email:'',
          password:'',
          error:''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.signInWithEmailAndPasswordHandler = this.signInWithEmailAndPasswordHandler.bind(this);
  }

    componentDidMount() {
        {/* call the api on page load */}
        this.callApi();
}
    async callApi() {
        try {
            const response = await axios.get('/walter_api/v2/users');
            //console.log(response.data);
            {/* store api data in state */}
            this.setState({users:response.data});
        } catch (e) {
        console.log(e);
        }
    }
    
    signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        // auth.signInWithEmailAndPassword(email, password).catch(error => {
        // setError("Error signing in with password and email!");
        //   console.error("Error signing in with password and email", error);
        // });
      };
      onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

      render() {
        return (
            <div className="main">
              <h1>Sign In</h1>
              <div >
                {error !== null && <div>{error}</div>}
                <form>
                  <label htmlFor="userEmail">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value = {email}
                    placeholder="test@gmail.com"
                    id="userEmail"
                    onChange = {(event) => onChangeHandler(event)}
                  />
                  <label htmlFor="userPassword">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    value = {password}
                    placeholder="Your Password"
                    id="userPassword"
                    onChange = {(event) => onChangeHandler(event)}
                  />
                  <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Sign in
                  </button>
                </form>
                 <Link to="/SignUp">Don't have an account? Sign up here
                  </Link>
              </div>
            </div>
          );
      }
  
};
