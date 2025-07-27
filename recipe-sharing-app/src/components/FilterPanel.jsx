import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const FilterPanel = () => {
  const { recipes, filteredRecipes, setSearchTerm, filterByIngredient, filterByCookingTime, clearFilters } = useRecipeStore(state => ({
    recipes: state.recipes,
    filteredRecipes: state.filteredRecipes,
    setSearchTerm: state.setSearchTerm,
    filterByIngredient: state.filterByIngredient,
    filterByCookingTime: state.filterByCookingTime,
    clearFilters: state.clearFilters
  }));

  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [maxCookingTime, setMaxCookingTime] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique ingredients from all recipes
  const getAllIngredients = () => {
    const ingredients = new Set();
    recipes.forEach(recipe => {
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          ingredients.add(ingredient.toLowerCase().trim());
        });
      }
    });
    return Array.from(ingredients).sort();
  };

  const handleIngredientFilter = (ingredient) => {
    setSelectedIngredient(ingredient);
    if (ingredient) {
      filterByIngredient(ingredient);
    } else {
      clearFilters();
    }
  };

  const handleCookingTimeFilter = (time) => {
    setMaxCookingTime(time);
    if (time) {
      filterByCookingTime(parseInt(time));
    } else {
      clearFilters();
    }
  };

  const handleClearAllFilters = () => {
    setSelectedIngredient('');
    setMaxCookingTime('');
    clearFilters();
  };

  const uniqueIngredients = getAllIngredients();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto 20px',
      padding: '15px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: showFilters ? '15px' : '0'
      }}>
        <h4 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '16px'
        }}>
          🔧 Advanced Filters
        </h4>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {/* Ingredient Filter */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#555',
              fontSize: '14px'
            }}>
              Filter by Ingredient:
            </label>
            <select
              value={selectedIngredient}
              onChange={(e) => handleIngredientFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="">All Ingredients</option>
              {uniqueIngredients.map((ingredient, index) => (
                <option key={index} value={ingredient}>
                  {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Cooking Time Filter */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#555',
              fontSize: '14px'
            }}>
              Max Cooking Time (minutes):
            </label>
            <select
              value={maxCookingTime}
              onChange={(e) => handleCookingTimeFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Any Time</option>
              <option value="15">Under 15 minutes</option>
              <option value="30">Under 30 minutes</option>
              <option value="60">Under 1 hour</option>
              <option value="120">Under 2 hours</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div style={{
            display: 'flex',
            alignItems: 'end'
          }}>
            <button
              onClick={handleClearAllFilters}
              style={{
                width: '100%',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7f8c8d'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#95a5a6'}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(selectedIngredient || maxCookingTime) && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#e8f4fd',
          borderRadius: '4px',
          border: '1px solid #bee5eb'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#0c5460',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>
            Active Filters:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {selectedIngredient && (
              <span style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Ingredient: {selectedIngredient}
              </span>
            )}
            {maxCookingTime && (
              <span style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Max Time: {maxCookingTime} min
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
