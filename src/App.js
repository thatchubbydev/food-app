import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "8e27d0f7";
  const APP_KEY = "c47005750ccbe9b31b8f3f6c4c314ef4";

  const [value, setValue] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipe(data.hits);
      console.log(data.hits);
    };
    getRecipes();
  }, [query]);
  //only wat to run whenever i hit the search button

  const handleChange = (e) => {
    setValue(() => e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
    setValue("");
  };

  return (
    <div className="App">
      <form className="search-form">
        <input
          className="search-bar"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button className='search-button' onClick={handleSubmit}>Search</button>
      </form>
      <div className='recipes'>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      
    </div>
  );
};

export default App;
