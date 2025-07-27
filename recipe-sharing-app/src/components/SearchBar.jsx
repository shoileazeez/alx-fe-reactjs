import { useState, useEffect } from 'react';
import useRecipeStore from '../recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filteredRecipes, recipes } = useRecipeStore(state => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
    filteredRecipes: state.filteredRecipes,
    recipes: state.recipes
  }));
  
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounced search to improve performance
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, setSearchTerm]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto 30px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h3 style={{
          margin: '0 0 10px 0',
          color: '#2c3e50',
          textAlign: 'center'
        }}>
          🔍 Search Recipes
        </h3>
        
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Search by recipe name, ingredients, or cooking time..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 45px 12px 15px',
              border: '2px solid #ddd',
              borderRadius: '25px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          
          {localSearchTerm && (
            <button
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#7f8c8d',
                padding: '5px',
                borderRadius: '50%'
              }}
              title="Clear search"
              onMouseEnter={(e) => e.target.style.color = '#e74c3c'}
              onMouseLeave={(e) => e.target.style.color = '#7f8c8d'}
            >
              ✕
            </button>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: '#7f8c8d'
        }}>
          <span>
            {searchTerm ? (
              <>Showing {filteredRecipes.length} of {recipes.length} recipes</>
            ) : (
              <>Total: {recipes.length} recipes</>
            )}
          </span>
          
          {searchTerm && (
            <div style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Searching: "{searchTerm}"
            </div>
          )}
        </div>
        
        {searchTerm && filteredRecipes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '6px',
            color: '#856404'
          }}>
            <p style={{ margin: 0 }}>
              No recipes found for "{searchTerm}". Try different keywords or 
              <button 
                onClick={handleClearSearch}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3498db',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginLeft: '5px'
                }}
              >
                clear search
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
