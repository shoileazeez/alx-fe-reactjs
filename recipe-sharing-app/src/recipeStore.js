import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
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
    filteredRecipes: get().filterRecipesByTerm(recipes, state.searchTerm)
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
  }))
}));

export default useRecipeStore;
