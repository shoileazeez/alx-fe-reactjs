import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to load recipes:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Recipe Sharing Platform
        </h1>
        <Link
          to="/add-recipe"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
        >
          + Add Recipe
        </Link>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {recipe.title}
              </h2>
              <p className="text-gray-600 mb-4 flex-1">{recipe.summary}</p>
              <div className="mt-auto">
                <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  View Recipe →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;