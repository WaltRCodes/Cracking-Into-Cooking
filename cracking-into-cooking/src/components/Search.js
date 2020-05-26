import React, { Component } from 'react'
import axios from 'axios';
import Recipe from './Recipe';
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      resultsHTML:'',
      ingredients:[],
      recipes:[]

         
    }
    {/* make all the mehods that will be utilized*/}
    this.makeSearch = this.makeSearch.bind(this);
    this.takeTerm = this.takeTerm.bind(this);
  }
  async callApi() {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_KEY}&ingredients=${this.state.searchTerm}&number=10&limitLicense=false&ranking=1&ignorePantry=false`);
      {/* call the API and create HTML elements*/}
      //const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_KEY}&ingredients=${this.state.searchTerm}&number=2&limitLicense=false&ranking=1&ignorePantry=false`);
    //const body = await response.json();
      //console.log(body);
      console.log(response.data);
      let elements = response.data.map(recipe => <Recipe id={recipe.id} search={true} editRecipe={''} title={recipe.title} image={recipe.image} 
        ingredients={recipe.missedIngredients.map(ingredient => <div>{ingredient.originalString}<div id={ingredient.id}><button onClick={() => {this.postDatabase("ingredients",{
        "id": this.state.ingredients.findIndex(stored => stored.name===ingredient.name)!=-1 ? this.state.ingredients[this.state.ingredients.findIndex(stored => stored.name===ingredient.name)].id:null,//put check here later and make button diappear
        "name": ingredient.name,
        "amount": this.state.ingredients.findIndex(stored => stored.name===ingredient.name)!=-1 ? this.state.ingredients[this.state.ingredients.findIndex(stored => stored.name===ingredient.name)].amount+ingredient.amount:ingredient.amount,
        "image": ingredient.image,
        "unit": ingredient.unit,
        "userId": this.props.id
    }); document.getElementById(ingredient.id).innerHTML="Added Ingredient!";}}>Add this ingredient to your list</button></div></div>)}
    addRecipe={() => {this.postDatabase("recipes",{
        "id": null,//put check here later and make button diappear
        "name": recipe.title,
        "image": recipe.image,
        "description": "null",
        "ingredients": recipe.missedIngredients.map(ingredient =>ingredient.originalString),
        "userId": this.props.id
    }); document.getElementById(recipe.id).innerHTML="Added Recipe!";}}
    />);
        {/* store the values in state*/}
      this.setState({
        resultsHTML: elements
      })
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    {/* call the api on page load */}
    this.callIngredients();
    this.callRecipes();
}
  
  async callIngredients() {
    try {
        const response = await axios.get('/walter_api/v2/ingredients');
        //console.log(response.data);
        {/* store api data in state */}
        this.setState({ingredients:response.data});
    } catch (e) {
    console.log(e);
    }
}

async callRecipes() {
    try {
        const response = await axios.get('/walter_api/v2/recipes');
        //console.log(response.data);
        {/* store api data in state */}
        this.setState({recipes:response.data});
    } catch (e) {
    console.log(e);
    }
}

async postDatabase(term,object) {
    try {
      const response = await axios.post('/walter_api/v2/'+term,object);
      
      console.log(response.data);
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  };

  makeSearch(event){
    event.preventDefault();
    
    
    this.callApi();
    
  }
  
  takeTerm(event){
    this.setState({searchTerm: event.target.value});
  }
 
  


  render() {
    return (
      <div className="main">
            <form onSubmit={this.makeSearch}>
            <h1>What Ingredients do you already have?</h1>
            <label>
                Search
                <input type="text" onChange={this.takeTerm} placeholder="search term"/>
            </label>
            <br />
            
            <br />
            <label>
                <input type="submit" value="Submit"/>
            </label>
          </form>
            <div className="grid">{this.state.resultsHTML}</div>
      </div>
      
    )
  }
}