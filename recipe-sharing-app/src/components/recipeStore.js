import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  setRecipes: (recipes) => set({ recipes }),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== parseInt(id))
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === parseInt(id) ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  getRecipeById: (id) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === parseInt(id));
  }
}));

export default useRecipeStore;
