import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar">
        <Link to="/">Profile</Link>
        <Link to="/RecipeForm">Make new Recipe</Link>
        <Link to="/IngredientForm">Make new Ingredient</Link>
        <Link to="/Search">Search</Link>
    </div>
  );
}

export default Navbar;