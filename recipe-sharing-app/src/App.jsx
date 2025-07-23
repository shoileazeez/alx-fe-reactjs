import { useEffect } from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import useRecipeStore from './components/recipeStore';
import './App.css';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Initialize with some sample recipes
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside. Perfect for any occasion!"
      },
      {
        id: 2,
        title: "Spaghetti Carbonara",
        description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and pepper. Simple yet incredibly flavorful."
      }
    ];
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.5em'
        }}>Recipe Sharing App</h1>
        <p style={{
          margin: '10px 0 0 0',
          fontSize: '1.2em',
          opacity: 0.9
        }}>Share and discover amazing recipes</p>
      </header>

      <main style={{
        padding: '0 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <AddRecipeForm />
        <RecipeList />
      </main>

      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px'
      }}>
        <p>&copy; 2024 Recipe Sharing App. Built with React & Zustand.</p>
      </footer>
    </div>
  );
}

export default App;