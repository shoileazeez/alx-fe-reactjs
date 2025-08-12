import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load recipe:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {recipe.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="font-medium">Prep Time:</span>
                  <span className="ml-1">{recipe.prepTime || "30 mins"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Cook Time:</span>
                  <span className="ml-1">{recipe.cookTime || "45 mins"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Servings:</span>
                  <span className="ml-1">{recipe.servings || "4"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {(recipe.ingredients || [
                "2 cups all-purpose flour",
                "1 cup sugar",
                "1/2 cup butter",
                "2 eggs",
                "1 tsp vanilla extract",
                "1 tsp baking powder",
                "1/2 tsp salt",
                "1/2 cup milk"
              ]).map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {(recipe.instructions || [
                "Preheat your oven to 350°F (175°C).",
                "In a large bowl, cream together butter and sugar until light and fluffy.",
                "Beat in eggs one at a time, then stir in vanilla.",
                "In a separate bowl, whisk together flour, baking powder, and salt.",
                "Gradually add dry ingredients to wet ingredients, alternating with milk.",
                "Mix until just combined, do not overmix.",
                "Pour batter into prepared pan and bake for 25-30 minutes.",
                "Cool completely before serving."
              ]).map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips & Notes</h2>
          <div className="prose text-gray-700">
            <p>
              {recipe.tips || "For best results, make sure all ingredients are at room temperature before mixing. This recipe can be stored in the refrigerator for up to 3 days or frozen for up to 3 months."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
