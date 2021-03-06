import React, { Component } from 'react';
import axios from 'axios';

export default class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      image: this.props.image,
      unit: this.props.unit,
      amount:parseFloat(this.props.amount),
      ingredients:[],
      submittingInfo:true
         
    }
    {/* make all the mehods that will be utilized*/}
    this.createIngredient = this.createIngredient.bind(this);
    this.takeName = this.takeName.bind(this);
    this.takeImage = this.takeImage.bind(this);
    this.takeUnit = this.takeUnit.bind(this);
    this.takeAmount = this.takeAmount.bind(this);
  }

  componentDidMount() {
    {/* call the api on page load */}
    this.callIngredients();
    document.getElementById('ingredientname').value=this.props.name;
    document.getElementById('ingredientimage').value=this.props.image;
    document.getElementById('ingredientunit').value=this.props.unit;
    document.getElementById('ingredientamt').value=this.props.amount;
}
  
  async callIngredients() {
    try {
        const response = await axios.get('https://cors-anywhere.herokuapp.com/https://nameless-dawn-18115.herokuapp.com/walter_api/v2/ingredients');
        //console.log(response.data);
        {/* store api data in state */}
        this.setState({ingredients:response.data});
    } catch (e) {
    console.log(e);
    }
}
  
  async postApi(object) {
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://nameless-dawn-18115.herokuapp.com/walter_api/v2/ingredients',object);
      
      console.log(response.data);
      console.log(response);
      
    } catch (e) {
      console.log(e);
    }
  }
  
  createIngredient(event){
    event.preventDefault();
    let ingredient = {
        "id": this.state.ingredients.findIndex(stored => stored.name===this.state.name)!=-1 ? this.state.ingredients[this.state.ingredients.findIndex(stored => stored.name===this.state.name)].id:null,//put check here later and make button diappear
        "name": this.state.name,
        "amount": this.state.amount,
        "image": this.state.image,
        "unit": this.state.unit,
        "userId": this.props.id
    };
    
    this.postApi(ingredient);
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
  takeAmount(event){
    this.setState({amount: parseFloat(event.target.value)});
  }
  takeUnit(event){
    this.setState({unit: event.target.value});
  }
  
//onclick of the update button, have the values of that cell sent as props here to fill in the form

  render() {
    return (
      <div className="main">
        {
            this.state.submittingInfo
            ?
            <form id="main" onSubmit={this.createIngredient}>
            <h1>Enter the info for your new Ingredient</h1>
            <label>
                Name
                <input type="text" onChange={this.takeName} id="ingredientname" enabled="true"/>
            </label>
            <br />
            <label>
                Image URL
                <input type="text" onChange={this.takeImage} id="ingredientimage" enabled="true"/>
            </label>
            <br />
            <label>
                Unit
                <input type="text" onChange={this.takeUnit} id="ingredientunit" enabled="true"/>
            </label>
            <br />
            <label>
                Amount
                <input type="number" onChange={this.takeAmount} id="ingredientamt" enabled="true"/>
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