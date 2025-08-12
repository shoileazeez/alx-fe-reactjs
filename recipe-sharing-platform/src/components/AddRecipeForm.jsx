import { useState } from "react";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    tips: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe summary is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients list is required";
    } else {
      // Check if ingredients list has at least 2 items
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim() !== '');
      if (ingredientsList.length < 2) {
        newErrors.ingredients = "Please include at least 2 ingredients";
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Cooking instructions are required";
    } else {
      // Check if instructions have at least 2 steps
      const instructionsList = formData.instructions.split('\n').filter(item => item.trim() !== '');
      if (instructionsList.length < 2) {
        newErrors.instructions = "Please include at least 2 instruction steps";
      }
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = "Preparation time is required";
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = "Cooking time is required";
    }

    if (!formData.servings.trim()) {
      newErrors.servings = "Number of servings is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send the data to your backend here
      console.log("Recipe submitted:", {
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(item => item.trim() !== ''),
        instructions: formData.instructions.split('\n').filter(item => item.trim() !== '')
      });
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: "",
        summary: "",
        ingredients: "",
        instructions: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        tips: ""
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      console.error("Error submitting recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors"
          >
            ← Back to Recipes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Recipe</h1>
          <p className="text-gray-600 mt-2">Share your favorite recipe with the community</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Recipe submitted successfully! 🎉
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Recipe Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter the recipe title"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Recipe Summary */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Summary *
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Brief description of your recipe"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                errors.summary ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
          </div>

          {/* Time and Servings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time *
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleInputChange}
                placeholder="e.g., 15 mins"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
            </div>

            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time *
              </label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleInputChange}
                placeholder="e.g., 30 mins"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cookTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cookTime && <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>}
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Servings *
              </label>
              <input
                type="text"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                placeholder="e.g., 4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients * <span className="text-gray-500 text-sm">(Enter each ingredient on a new line)</span>
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={8}
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="2 cups all-purpose flour&#10;1 cup sugar&#10;1/2 cup butter&#10;2 eggs"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Cooking Instructions * <span className="text-gray-500 text-sm">(Enter each step on a new line)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Preheat oven to 350°F (175°C)&#10;Mix dry ingredients in a large bowl&#10;Add wet ingredients and mix until combined&#10;Bake for 25-30 minutes"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                errors.instructions ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
          </div>

          {/* Tips (Optional) */}
          <div>
            <label htmlFor="tips" className="block text-sm font-medium text-gray-700 mb-2">
              Tips & Notes <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <textarea
              id="tips"
              name="tips"
              rows={3}
              value={formData.tips}
              onChange={handleInputChange}
              placeholder="Any helpful tips or notes for making this recipe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Add Recipe'
              )}
            </button>
            
            <Link
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium text-center"
            >
              Cancel
            </Link>
          </div>

          {/* Required Fields Note */}
          <p className="text-sm text-gray-500 text-center pt-2">
            * Required fields
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
