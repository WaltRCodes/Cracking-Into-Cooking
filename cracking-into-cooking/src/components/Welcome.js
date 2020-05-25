import React, { Component } from 'react';
import {
    BrowserRouter,
    Route
  } from "react-router-dom";
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import Search from './Search';
import Navbar from './Navbar';
import RecipeForm from './RecipeForm';
import IngredientForm from './Ingredientform';
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          signedIn: false,
          user:0,
          ingredient: {
            "name": "",
            "amount": 0,
            "image": "",
            "unit": ""
            },
          recipe: {
            "name": "",
            "image": "",
            "description": "",
            "ingredients": ""
            }
        }
        this.signingIn = this.signingIn.bind(this);
        this.editOrDelete = this.editOrDelete.bind(this);
  }

  signingIn(id){
    {/* update the ymbol in state */}
    this.setState({signedIn: true,user:id});
    //console.log(this.state.user);
  }
  editOrDelete(term,first,second,third,fourth){
    if (term==='recipes'){
       this.setState({
        recipe: {
            "name": first,
            "image": second,
            "description": third,
            "ingredients": fourth.join(",")
            }
       });
      }else if(term==='ingredients'){
        this.setState({
            ingredient: {
            "name": first,
            "amount": parseFloat(fourth),
            "image": second,
            "unit": third
            }});
    }
  }

  render() {
    return (
      <div>
          {this.state.signedIn ?
            <BrowserRouter>
                <Navbar />
                <Route exact strict path="/" render={() => <div><Profile id={this.state.user} capture={this.editOrDelete}/></div>} />
                <Route path="/Search" render={() => <div><Search id={this.state.user}/></div>} />
                <Route path="/RecipeForm" render={() => <div><RecipeForm id={this.state.user} name={this.state.recipe.name} image={this.state.recipe.image} description={this.state.recipe.description} ingredients={this.state.recipe.ingredients}/></div>} />
                <Route path="/IngredientForm" render={() => <div><IngredientForm id={this.state.user} name={this.state.ingredient.name} image={this.state.ingredient.image} unit={this.state.ingredient.unit} amount={this.state.ingredient.amount}/></div>} />
            </BrowserRouter>
            
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