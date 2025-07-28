import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useRecipeStore from '../recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const { recipe, toggleFavorite, isFavorite } = useRecipeStore(state => ({
    recipe: state.recipes.find(recipe => recipe.id === parseInt(id)),
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite
  }));

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
  };

  if (!recipe) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#e74c3c' }}>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <Link 
          to="/"
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            display: 'inline-block',
            marginTop: '20px'
          }}
        >
          Back to Recipe List
        </Link>
      </div>
    );
  }

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '20px'
      }}>
        <Link 
          to="/"
          style={{
            color: '#3498db',
            textDecoration: 'none',
            fontSize: '16px'
          }}
        >
          ← Back to Recipe List
        </Link>
      </div>

      {isEditing ? (
        <EditRecipeForm 
          recipe={recipe} 
          onSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <h1 style={{
              color: '#2c3e50',
              margin: '0',
              fontSize: '2.5em',
              flex: 1
            }}>
              {recipe.title}
            </h1>
            <button
              onClick={handleToggleFavorite}
              style={{
                background: 'none',
                border: '2px solid #e74c3c',
                borderRadius: '8px',
                padding: '10px 15px',
                cursor: 'pointer',
                fontSize: '18px',
                marginLeft: '20px',
                backgroundColor: isFavorite(recipe.id) ? '#e74c3c' : 'transparent',
                color: isFavorite(recipe.id) ? 'white' : '#e74c3c',
                transition: 'all 0.3s ease'
              }}
              title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(recipe.id) ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <div style={{
            color: '#7f8c8d',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            Recipe ID: {recipe.id} | Created: {new Date(recipe.id).toLocaleDateString()}
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Description:</h3>
            <p style={{
              color: '#555',
              lineHeight: '1.8',
              fontSize: '16px'
            }}>
              {recipe.description}
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-start'
          }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: '#f39c12',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
            >
              Edit Recipe
            </button>
            
            <DeleteRecipeButton 
              recipeId={recipe.id} 
              recipeName={recipe.title}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
