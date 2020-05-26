import React, { Component } from 'react'
import axios from 'axios';
import Recipe from './Recipe';
import {Link } from "react-router-dom";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsHTML:'',
      ingredients:[''],
      recipes:['']

         
    }
    {/* make all the mehods that will be utilized*/}
    this.bringUpIngredients = this.bringUpIngredients.bind(this);
    this.bringUpRecipes = this.bringUpRecipes.bind(this);
  }
  async callApi(term) {
    try {
      const response = await axios.get('/walter_api/v2/'+term);
      {/* call the API and create HTML elements*/}
      //const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_KEY}&ingredients=${this.state.searchTerm}&number=2&limitLicense=false&ranking=1&ignorePantry=false`);
    //const body = await response.json();
      //console.log(body);
      console.log(response.data);
      let data = response.data.filter(obj => obj.userId === this.props.id);
      let elements = <div>Error</div>;
      if (term==='recipes'){
        elements = data.map(recipe => <Recipe id={recipe.id}  search={false} title={recipe.title} image={recipe.image} 
            ingredients={recipe.ingredients.map(ingredient => <div>{ingredient}</div>)}
        deleteRecipe={() => {this.deleteApi("recipes",recipe.id); document.getElementById(recipe.id).innerHTML="Deleted Recipe!";}}
        editRecipe={
            <Link to="/RecipeForm" onClick={() => this.props.capture("recipes",recipe.name,recipe.image,recipe.description,recipe.ingredients)} >
              Edit this Recipe
            </Link>
        }
        />);
      }else if(term==='ingredients'){
        elements = data.map(ingredient => 
        <div>
            <p>{ingredient.amount} {ingredient.unit} of {ingredient.name}</p>
            <img src={ingredient.image}/>
            <Link to="/IngredientForm" onClick={() => this.props.capture('ingredients',ingredient.name,ingredient.image,ingredient.unit,ingredient.amount)} >
              Edit this Ingredient
            </Link>
            <div id={ingredient.id}>
                <button onClick={() => {this.deleteApi("ingredients",ingredient.id); document.getElementById(ingredient.id).innerHTML="Deleted Ingredient!";}}>Delete this ingredient from your list</button>
            </div>
        </div>);
    }

        {/* store the values in state*/}
      this.setState({
        resultsHTML: elements
      })
    } catch (e) {
      console.log(e);
    }
  }

//   componentDidMount() {
//     {/* call the api on page load */}
//     this.callIngredients();
//     this.callRecipes();
// }
  
//   async callIngredients() {
//     try {
//         const response = await axios.get('/walter_api/v2/ingredients');
//         //console.log(response.data);
//         {/* store api data in state */}
//         this.setState({ingredients:response.data});
//     } catch (e) {
//     console.log(e);
//     }
// }

// async callRecipes() {
//     try {
//         const response = await axios.get('/walter_api/v2/recipes');
//         //console.log(response.data);
//         {/* store api data in state */}
//         this.setState({recipes:response.data});
//     } catch (e) {
//     console.log(e);
//     }
// }

async deleteApi(term,id) {
    console.log("This is running",id);
    try {
      const response = await axios.delete('/walter_api/v2/'+term+'/'+id);
      
      console.log(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  
  bringUpIngredients(){
    this.callApi('ingredients');
  }

  bringUpRecipes(){
    this.callApi('recipes');
}

  render() {
    return (
      <div>
            
            <h1>Check out your saved recipes and Ingredients</h1>
            <button onClick={this.bringUpRecipes}>See what Recipes you saved or made</button>
            <button onClick={this.bringUpIngredients}>See what Ingredients you have added</button>
            {this.state.resultsHTML}
      </div>
      
    )
  }
}