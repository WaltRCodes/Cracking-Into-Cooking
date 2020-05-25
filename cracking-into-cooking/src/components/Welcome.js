import React, { Component } from 'react';
import {
    BrowserRouter,
    Route
  } from "react-router-dom";
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import Search from './Search'
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          signedIn: false,
          user:0
        }
        this.signingIn = this.signingIn.bind(this);
  }

  signingIn(id){
    {/* update the ymbol in state */}
    this.setState({signedIn: true,user:id});
    //console.log(this.state.user);
  }

  render() {
    return (
      <div>
          {this.state.signedIn ?
            <Search id={this.state.user}/>
        :
            <BrowserRouter>
                <Route exact strict path="/" render={() => <div><SignIn Allowed={this.signingIn}/></div>} />
                <Route path="/SignUp" render={() => <div><SignUp/></div>} />
            </BrowserRouter>
        }
        
        
      </div>
      
    )
  }
}