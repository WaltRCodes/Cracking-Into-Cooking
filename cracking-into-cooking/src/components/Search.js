import React, { Component } from 'react'
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      resultsHTML:''
         
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
    //   let elements = response.data.map(wine => 
    //     <div key={wine["id"]} className="wine" tabIndex="1">
    //       <img src={wine["picture"]} height="200px" width="100%"/>
    //       <h4>{wine["name"]} ({wine["year"]})</h4>
    //       <h5>{wine["grapes"]}</h5>
    //       <h6>{wine["country"], wine["region"]}</h6>
    //       <p>{wine["description"]}</p>
    //       <button onClick={() => this.deleteApi(wine["id"])}>Delete This</button>
    //     </div>);
    //     {/* store the values in state*/}
    //   this.setState({
    //     wines: response.data,
    //     winesHTML: elements
    //   })
    } catch (e) {
      console.log(e);
    }
  }
  
  
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
            
      </div>
      
    )
  }
}