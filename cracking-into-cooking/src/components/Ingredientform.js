import React, { Component } from 'react';
import axios from 'axios';

export default class IngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      unit: "",
      amount:0.0,
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
  
  async postApi(object) {
    try {
      const response = await axios.post('/walter_api/v2/ingredients',object);
      
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
        "amount": this.state.ingredients.findIndex(stored => stored.name===this.state.name)!=-1 ? this.state.ingredients[this.state.ingredients.findIndex(stored => stored.name===this.state.name)].amount+this.state.amount:this.state.amount,
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
    this.setState({unit: parseFloat(event.target.value)});
  }
  takeUnit(event){
    this.setState({amount: event.target.value});
  }
  
//onclick of the update button, have the values of that cell sent as props here to fill in the form

  render() {
    return (
      <div>
        {
            this.state.submittingInfo
            ?
            <form id="main" onSubmit={this.createIngredient}>
            <h1>Enter the info for your new Ingredient</h1>
            <label>
                Name
                <input type="text" onChange={this.takeName} placeholder="name"/>
            </label>
            <br />
            <label>
                Image URL
                <input type="text" onChange={this.takeImage} placeholder="url"/>
            </label>
            <br />
            <label>
                Unit
                <input type="text" onChange={this.takeUnit} placeholder="lbs"/>
            </label>
            <br />
            <label>
                Amount
                <input type="number" onChange={this.takeAmount} placeholder="0"/>
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