import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showrecipes, setShowrecipes] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchData = async () => {
    const result = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    const data = await result.json();
    setRecipes(data?.recipes);
  };

  return (
    <div className="App">
      <h1>Autocomplete Searchbar</h1>

      <div className="result-container ">
        <input
          className="Searchbar"
          type="text"
          name=""
          id=""
          value={query}
          onFocus={() => setShowrecipes(true)}
          onBlur={() => setShowrecipes(false)}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showrecipes && (
          <div className="recipes">
            {recipes.map((e) => (
              <span key={e.id}>{e.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
