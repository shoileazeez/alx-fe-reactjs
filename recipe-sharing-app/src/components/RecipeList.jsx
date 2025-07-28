import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeList = () => {
  const { 
    filteredRecipes, 
    searchTerm, 
    deleteRecipe, 
    toggleFavorite, 
    isFavorite 
  } = useRecipeStore(state => ({
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm,
    deleteRecipe: state.deleteRecipe,
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite
  }));

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  const handleToggleFavorite = (e, recipeId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipeId);
  };

  // Use filteredRecipes instead of all recipes
  const recipesToDisplay = filteredRecipes;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: '#333',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        {searchTerm ? `Search Results (${recipesToDisplay.length})` : `Recipe Collection (${recipesToDisplay.length})`}
      </h2>
      
      {recipesToDisplay.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          {searchTerm ? (
            <div>
              <p style={{
                color: '#666',
                fontSize: '18px',
                marginBottom: '10px'
              }}>
                No recipes found matching your search criteria.
              </p>
              <p style={{
                color: '#888',
                fontSize: '14px'
              }}>
                Try adjusting your search terms or filters.
              </p>
            </div>
          ) : (
            <p style={{
              color: '#666',
              fontSize: '18px'
            }}>
              No recipes yet. Add your first recipe above!
            </p>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {recipesToDisplay.map(recipe => (
            <div key={recipe.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <h3 style={{
                  color: '#2c3e50',
                  margin: '0',
                  fontSize: '1.4em',
                  flex: 1
                }}>{recipe.title}</h3>
                <button
                  onClick={(e) => handleToggleFavorite(e, recipe.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    marginLeft: '10px'
                  }}
                  title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '15px'
              }}>{recipe.description.substring(0, 100)}...</p>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '15px'
              }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    display: 'inline-block'
                  }}
                >
                  View Details
                </Link>
                
                <button 
                  onClick={() => handleDelete(recipe.id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                >
                  Delete Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
