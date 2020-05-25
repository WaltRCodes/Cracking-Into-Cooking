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
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_KEY}&ingredients=${this.state.searchTerm}&number=2&limitLicense=false&ranking=1&ignorePantry=false`);
      {/* call the API and create HTML elements*/}
      //const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_KEY}&ingredients=${this.state.searchTerm}&number=2&limitLicense=false&ranking=1&ignorePantry=false`);
    //const body = await response.json();
      //console.log(body);
      console.log(response.data);
      let elements = response.data.map(recipe => <Recipe title={recipe.title} image={recipe.image} ingredients={recipe.missedIngredients.map(ingredient => <div>{ingredient.originalString}</div>)}/>);
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
    this.callDatabase("ingredients");
    this.callDatabase("recipes");
}
  
  async callDatabase(term) {
    try {
        const response = await axios.get('/walter_api/v2/'+term);
        //console.log(response.data);
        {/* store api data in state */}
        this.setState({term:response.data});
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
      <div>
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
            {this.state.resultsHTML}
      </div>
      
    )
  }
}