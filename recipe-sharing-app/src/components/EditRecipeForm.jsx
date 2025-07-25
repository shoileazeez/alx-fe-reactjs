import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const EditRecipeForm = ({ recipe, onSuccess, onCancel }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);

    try {
      updateRecipe(recipe.id, {
        title: title.trim(),
        description: description.trim(),
        updatedAt: Date.now()
      });
      
      alert('Recipe updated successfully!');
      onSuccess();
    } catch (error) {
      alert('Error updating recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px',
        fontSize: '2em'
      }}>
        Edit Recipe
      </h2>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Recipe Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isSubmitting}
            rows="6"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '10px'
        }}>
          <button 
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#bdc3c7' : '#27ae60',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              flex: 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#229954';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#27ae60';
            }}
          >
            {isSubmitting ? 'Updating...' : 'Update Recipe'}
          </button>
          
          <button 
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            style={{
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              flex: 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#7f8c8d';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#95a5a6';
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
