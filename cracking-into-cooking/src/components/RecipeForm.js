import React, { Component } from 'react';
import axios from 'axios';

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      image: this.props.image,
      description: this.props.description,
      recipes:[],
      ingredients:this.props.ingredients.split(','),
      submittingInfo:true
         
    }
    {/* make all the mehods that will be utilized*/}
    this.createRecipe = this.createRecipe.bind(this);
    this.takeName = this.takeName.bind(this);
    this.takeImage = this.takeImage.bind(this);
    this.takeDescription = this.takeDescription.bind(this);
    this.takeIngredients = this.takeIngredients.bind(this);
  }

  componentDidMount() {
    {/* call the api on page load */}
    this.callRecipes();
    document.getElementById('recipename').value=this.props.name;
    document.getElementById('recipeimage').value=this.props.image;
    document.getElementById('recipedescription').value=this.props.description;
    document.getElementById('recipeingredients').value=this.props.ingredients;
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
  
  async postApi(object) {
    try {
      const response = await axios.post('/walter_api/v2/recipes',object);
      
      console.log(response.data);
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  }
  
  createRecipe(event){
    event.preventDefault();
    let recipe = {
        "id": this.state.recipes.findIndex(stored => stored.name===this.state.name)!=-1 ? this.state.recipes[this.state.recipes.findIndex(stored => stored.name===this.state.name)].id:null,//put check here later and make button diappear
        "name": this.state.name,
        "image": this.state.image,
        "description": this.state.description,
        "ingredients": this.state.ingredients,
        "userId": this.props.id
    };
    
    this.postApi(recipe);
    this.setState(prevState => ({
        submittingInfo: !prevState.submittingInfo
      }));
  }
  
  takeName(event){
    this.setState({name: event.target.value});
  }
  takeImage(event){
    this.setState({image: event.target.value});
  }
  takeDescription(event){
    this.setState({description: event.target.value});
  }
  takeIngredients(event){
    this.setState({ingredients: event.target.value.split(',')});
  }
  
//onclick of the update button, have the values of that cell sent as props here to fill in the form

  render() {
    return (
      <div>
        {
            this.state.submittingInfo
            ?
            <form id="main" onSubmit={this.createRecipe}>
            <h1>Enter the info for your new Recipe and please seperate ingredients with a ","</h1>
            <label>
                Name
                <input type="text" onChange={this.takeName} id="recipename" enabled="true" />
            </label>
            <br />
            <label>
                Image URL
                <input type="text" onChange={this.takeImage} id="recipeimage" enabled="true"/>
            </label>
            <br />
            <label>
                Description
                <input type="text" onChange={this.takeDescription} id="recipedescription" enabled="true" />
            </label>
            <br />
            <label>
                Ingredients
                <input type="text" onChange={this.takeIngredients} id="recipeingredients" enabled="true"/>
            </label>
            <br />
            <label>
                <input type="submit" value="Submit"/>
            </label>
          </form>
            :
            <h1>Thanks for your submission</h1>
        }
        
      </div>
      
    )
  }
}