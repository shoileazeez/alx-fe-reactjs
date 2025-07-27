import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const DeleteRecipeButton = ({ recipeId, recipeName, onDeleteSuccess }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmMessage = `Are you sure you want to delete "${recipeName}"? This action cannot be undone.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsDeleting(true);

    try {
      deleteRecipe(recipeId);
      alert(`"${recipeName}" has been deleted successfully.`);
      
      // Call the success callback if provided, otherwise navigate to home
      if (onDeleteSuccess) {
        onDeleteSuccess();
      } else {
        navigate('/');
      }
    } catch (error) {
      alert('Error deleting recipe. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        backgroundColor: isDeleting ? '#bdc3c7' : '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isDeleting) e.target.style.backgroundColor = '#c0392b';
      }}
      onMouseLeave={(e) => {
        if (!isDeleting) e.target.style.backgroundColor = '#e74c3c';
      }}
    >
      {isDeleting ? 'Deleting...' : 'Delete Recipe'}
    </button>
  );
};

export default DeleteRecipeButton;
