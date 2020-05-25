import React, { Component } from 'react';



export default class Recipe extends Component {
    constructor(props) {
        super(props);
        
  }
   
  render() {
    return (
        <div>
          <h1>You can make {this.props.title}</h1>
          <img src={this.props.image} />
          <h3>With the following ingredients:</h3>
          <div>{this.props.ingredients}</div>
          <div>
              <button>Save Recipe and Ingredients to your profile</button>
              <button>Save Ingredients to your profile</button>
          </div>
        </div>
      );

  }
  
};
