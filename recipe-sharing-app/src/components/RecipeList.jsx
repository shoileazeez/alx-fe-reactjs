import { Link } from 'react-router-dom';
import useRecipeStore from '.components/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

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
      }}>Recipe Collection</h2>
      
      {recipes.length === 0 ? (
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '18px',
          padding: '40px'
        }}>
          No recipes yet. Add your first recipe below!
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {recipes.map(recipe => (
            <div key={recipe.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                color: '#2c3e50',
                marginBottom: '10px',
                fontSize: '1.4em'
              }}>{recipe.title}</h3>
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
