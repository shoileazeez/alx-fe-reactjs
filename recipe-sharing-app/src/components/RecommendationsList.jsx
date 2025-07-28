import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, generateRecommendations]);

  if (favorites.length === 0) {
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
          Personalized Recommendations
        </h2>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1em'
        }}>
          Add some recipes to your favorites to get personalized recommendations!
        </p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#e8f4f8',
        border: '1px solid #b3d8e6',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '10px'
        }}>
          Personalized Recommendations
        </h2>
        <p style={{
          color: '#6c757d',
          fontSize: '1.1em'
        }}>
          No new recommendations at the moment. Try favoriting recipes with different ingredients or cooking styles!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      margin: '20px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          color: '#2c3e50',
          margin: 0,
          fontSize: '1.8em',
          borderBottom: '2px solid #f39c12',
          paddingBottom: '10px',
          flex: 1
        }}>
          ✨ Recommended For You
        </h2>
        <button
          onClick={generateRecommendations}
          style={{
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e67e22';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f39c12';
          }}
        >
          🔄 Refresh
        </button>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {recommendations.map(recipe => (
          <div key={recipe.id} style={{
            backgroundColor: '#ffffff',
            border: '2px solid #f39c12',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(243, 156, 18, 0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(243, 156, 18, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(243, 156, 18, 0.1)';
          }}>
            {/* Recommendation badge */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '20px',
              backgroundColor: '#f39c12',
              color: 'white',
              padding: '5px 12px',
              borderRadius: '15px',
              fontSize: '0.8em',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              ⭐ Match Score: {recipe.score}
            </div>

            {/* Add to favorites button */}
            <button
              onClick={() => addFavorite(recipe.id)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#229954';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#27ae60';
              }}
              title="Add to favorites"
            >
              🤍
            </button>

            <h3 style={{
              color: '#2c3e50',
              marginBottom: '10px',
              fontSize: '1.3em',
              paddingRight: '40px',
              marginTop: '20px'
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
                      backgroundColor: '#fff3cd',
                      color: '#856404',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '0.8em',
                      border: '1px solid #ffeaa7',
                      fontWeight: 'bold'
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

            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9em',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s ease',
                  flex: 1,
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e67e22';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f39c12';
                }}
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
