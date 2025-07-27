import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import useRecipeStore from '.recipeStore';
import './App.css';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Initialize with some sample recipes
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside. Perfect for any occasion! Ingredients: flour, butter, sugar, brown sugar, eggs, vanilla extract, baking soda, salt, chocolate chips. Instructions: 1. Preheat oven to 375°F. 2. Mix butter and sugars until creamy. 3. Beat in eggs and vanilla. 4. Gradually add flour mixture. 5. Stir in chocolate chips. 6. Drop rounded tablespoons on ungreased cookie sheets. 7. Bake 9-11 minutes until golden brown.",
        createdAt: Date.now() - 86400000 // 1 day ago
      },
      {
        id: 2,
        title: "Spaghetti Carbonara",
        description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and pepper. Simple yet incredibly flavorful. Ingredients: spaghetti, eggs, pecorino romano cheese, pancetta, black pepper, salt. Instructions: 1. Cook pasta according to package directions. 2. Cook pancetta until crispy. 3. Beat eggs with cheese and pepper. 4. Toss hot pasta with pancetta. 5. Remove from heat and quickly mix in egg mixture. 6. Serve immediately with extra cheese and pepper.",
        createdAt: Date.now() - 172800000 // 2 days ago
      }
    ];
    setRecipes(sampleRecipes);
  }, [setRecipes]);

  return (
    <Router>
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
          <Link 
            to="/" 
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <h1 style={{
              margin: 0,
              fontSize: '2.5em'
            }}>
              Recipe Sharing App
            </h1>
          </Link>
          <p style={{
            margin: '10px 0 0 0',
            fontSize: '1.2em',
            opacity: 0.9
          }}>
            Share and discover amazing recipes
          </p>
        </header>

        <main style={{
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
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
    </Router>
  );
}

export default App;