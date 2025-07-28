import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], // Array to store favorite recipe IDs
  recommendations: [], // Array to store recommended recipes
  
  // Basic CRUD operations
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return { 
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: get().filterRecipesByTerm(recipes, state.searchTerm),
    recommendations: get().generateRecommendations(recipes, state.favorites)
  })),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== parseInt(id));
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe => 
      recipe.id === parseInt(id) ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().filterRecipesByTerm(updatedRecipes, state.searchTerm)
    };
  }),
  
  getRecipeById: (id) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === parseInt(id));
  },
  
  // Search and filtering functionality
  setSearchTerm: (term) => set((state) => {
    const filteredRecipes = get().filterRecipesByTerm(state.recipes, term);
    return {
      searchTerm: term,
      filteredRecipes
    };
  }),
  
  filterRecipesByTerm: (recipes, searchTerm) => {
    if (!searchTerm.trim()) {
      return recipes;
    }
    
    const term = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(term)
      )) ||
      (recipe.cookingTime && recipe.cookingTime.toString().includes(term))
    );
  },
  
  filterRecipes: () => set((state) => ({
    filteredRecipes: get().filterRecipesByTerm(state.recipes, state.searchTerm)
  })),
  
  // Advanced filtering
  filterByIngredient: (ingredient) => set((state) => {
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.ingredients && recipe.ingredients.some(ing => 
        ing.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    return { filteredRecipes };
  }),
  
  filterByCookingTime: (maxTime) => set((state) => {
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.cookingTime && recipe.cookingTime <= maxTime
    );
    return { filteredRecipes };
  }),
  
  clearFilters: () => set((state) => ({
    searchTerm: '',
    filteredRecipes: state.recipes
  })),

  // Favorites functionality
  addFavorite: (recipeId) => set((state) => {
    if (state.favorites.includes(recipeId)) {
      return state; // Already in favorites
    }
    const updatedFavorites = [...state.favorites, recipeId];
    return { 
      favorites: updatedFavorites,
      recommendations: get().generateRecommendations(state.recipes, updatedFavorites)
    };
  }),
  
  removeFavorite: (recipeId) => set((state) => {
    const updatedFavorites = state.favorites.filter(id => id !== recipeId);
    return {
      favorites: updatedFavorites,
      recommendations: get().generateRecommendations(state.recipes, updatedFavorites)
    };
  }),
  
  toggleFavorite: (recipeId) => {
    const state = get();
    if (state.favorites.includes(recipeId)) {
      state.removeFavorite(recipeId);
    } else {
      state.addFavorite(recipeId);
    }
  },
  
  isFavorite: (recipeId) => {
    const state = get();
    return state.favorites.includes(recipeId);
  },

  // Recommendations system
  generateRecommendations: (recipes, favorites) => {
    if (!recipes || !favorites || favorites.length === 0) {
      return [];
    }

    // Get favorite recipes to analyze patterns
    const favoriteRecipes = favorites.map(id => 
      recipes.find(recipe => recipe.id === id)
    ).filter(Boolean);

    if (favoriteRecipes.length === 0) {
      return [];
    }

    // Extract common ingredients and patterns from favorites
    const favoriteIngredients = new Set();
    const favoriteDifficulties = new Set();
    let avgCookingTime = 0;

    favoriteRecipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          favoriteIngredients.add(ingredient.toLowerCase());
        });
      }
      if (recipe.difficulty) {
        favoriteDifficulties.add(recipe.difficulty);
      }
      if (recipe.cookingTime) {
        avgCookingTime += recipe.cookingTime;
      }
    });

    avgCookingTime = avgCookingTime / favoriteRecipes.length;

    // Find recipes that match user preferences but aren't already favorites
    const recommendations = recipes
      .filter(recipe => !favorites.includes(recipe.id)) // Exclude already favorited
      .map(recipe => {
        let score = 0;

        // Score based on shared ingredients
        if (recipe.ingredients) {
          const sharedIngredients = recipe.ingredients.filter(ingredient =>
            favoriteIngredients.has(ingredient.toLowerCase())
          ).length;
          score += sharedIngredients * 2;
        }

        // Score based on difficulty preference
        if (recipe.difficulty && favoriteDifficulties.has(recipe.difficulty)) {
          score += 3;
        }

        // Score based on cooking time preference (closer = better)
        if (recipe.cookingTime && avgCookingTime) {
          const timeDifference = Math.abs(recipe.cookingTime - avgCookingTime);
          if (timeDifference <= 15) score += 2;
          else if (timeDifference <= 30) score += 1;
        }

        return { ...recipe, recommendationScore: score };
      })
      .filter(recipe => recipe.recommendationScore > 0)
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6); // Return top 6 recommendations

    return recommendations;
  },

  updateRecommendations: () => set((state) => ({
    recommendations: get().generateRecommendations(state.recipes, state.favorites)
  }))
}));

export default useRecipeStore;
