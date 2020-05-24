import {Link} from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          userName:'',
          password:'',
          error:''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.signInWithNameAndPasswordHandler = this.signInWithNameAndPasswordHandler.bind(this);
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
    
    signInWithNameAndPasswordHandler = (event) => {
        event.preventDefault();
        // auth.signInWithEmailAndPassword(email, password).catch(error => {
        // setError("Error signing in with password and email!");
        //   console.error("Error signing in with password and email", error);
        // });
        if(this.state.users.findIndex(user => user.userName===this.state.userName&&user.password===this.state.password)){
            this.props.Allowed();
        } else{
            this.setState({error: <div>Sorry, no login was found</div>});
        }


      };
      onChangeHandler = (event) => {
          //const {name, value} = event.currentTarget;
        
          if(event.target.name === 'userName') {
              this.setState({userName:event.target.value});
          }
          else if(event.target.name === 'userPassword'){
            this.setState({password:event.target.value});
          }
      };

      render() {
        return (
            <div>
              <h1>Sign In</h1>
              <div >
                {this.state.error}
                <form>
                  <label>
                    UserName:
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder=""
                    onChange = {this.onChangeHandler}
                  />
                  <label>
                    Password:
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    placeholder="Password"
                    onChange = {this.onChangeHandler}
                  />
                  <button onClick = {this.signInWithNameAndPasswordHandler}>
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
