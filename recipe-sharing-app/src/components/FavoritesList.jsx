import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Get full recipe objects for favorites
  const favoriteRecipes = favorites.map(id => 
    recipes.find(recipe => recipe.id === id)
  ).filter(Boolean);

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h2 style={{
          color: '#6c757d',
          marginBottom: '10px'
        }}>
          My Favorites
        </h2>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1em'
        }}>
          No favorite recipes yet. Start exploring and save your favorites!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      margin: '20px 0'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '1.8em',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px'
      }}>
        My Favorites ({favoriteRecipes.length})
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}>
            {/* Remove from favorites button */}
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c0392b';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e74c3c';
              }}
              title="Remove from favorites"
            >
              ❤️
            </button>

            <h3 style={{
              color: '#2c3e50',
              marginBottom: '10px',
              fontSize: '1.3em',
              paddingRight: '40px'
            }}>
              {recipe.title}
            </h3>
            
            <p style={{
              color: '#6c757d',
              marginBottom: '15px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {recipe.description}
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '15px'
            }}>
              {recipe.cookingTime && (
                <span style={{
                  backgroundColor: '#e8f4f8',
                  color: '#3498db',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.9em',
                  fontWeight: 'bold'
                }}>
                  ⏱️ {recipe.cookingTime} min
                </span>
              )}
              {recipe.difficulty && (
                <span style={{
                  backgroundColor: recipe.difficulty === 'Easy' ? '#d4edda' : 
                                  recipe.difficulty === 'Medium' ? '#fff3cd' : '#f8d7da',
                  color: recipe.difficulty === 'Easy' ? '#155724' : 
                         recipe.difficulty === 'Medium' ? '#856404' : '#721c24',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.9em',
                  fontWeight: 'bold'
                }}>
                  📊 {recipe.difficulty}
                </span>
              )}
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{
                  color: '#495057',
                  fontSize: '0.9em',
                  margin: '0 0 5px 0',
                  fontWeight: 'bold'
                }}>
                  Key Ingredients:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px'
                }}>
                  {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                    <span key={index} style={{
                      backgroundColor: '#f8f9fa',
                      color: '#6c757d',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '0.8em',
                      border: '1px solid #e9ecef'
                    }}>
                      {ingredient}
                    </span>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <span style={{
                      color: '#6c757d',
                      fontSize: '0.8em',
                      padding: '2px 6px'
                    }}>
                      +{recipe.ingredients.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <Link 
              to={`/recipe/${recipe.id}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#3498db',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.9em',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2980b9';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3498db';
              }}
            >
              View Recipe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
