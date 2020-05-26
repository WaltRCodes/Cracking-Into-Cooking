import React, { Component } from 'react';



export default class Recipe extends Component {
    constructor(props) {
        super(props);
        
  }
   
  render() {
    return (
        <div className="cell">
          <h1>{this.props.title}</h1>
          <img src={this.props.image} />
          <h3>With the following ingredients:</h3>
          <div>{this.props.ingredients}</div>
          <div id={this.props.id}>
              {this.props.search
              ? <button onClick={this.props.addRecipe}>Save Recipe to your profile</button>
                : <div>
                    {this.props.editRecipe}
                    <button onClick={this.props.deleteRecipe}>Delete Recipe from your profile</button>
                </div>}
              
          </div>
        </div>
      );

  }
  
};
