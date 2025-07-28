import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import useRecipeStore from './recipeStore';
import './App.css';

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);

  // Initialize with enhanced sample recipes including ingredients and cooking time
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        title: "Classic Chocolate Chip Cookies",
        description: "Delicious homemade chocolate chip cookies that are crispy on the outside and chewy on the inside. Perfect for any occasion! These cookies are made with brown butter for extra flavor and use a mix of chocolate chips and chunks for the perfect texture.",
        ingredients: ["flour", "butter", "sugar", "brown sugar", "eggs", "vanilla extract", "baking soda", "salt", "chocolate chips"],
        cookingTime: 25,
        difficulty: "Easy",
        createdAt: Date.now() - 86400000
      },
      {
        id: 2,
        title: "Spaghetti Carbonara",
        description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and pepper. Simple yet incredibly flavorful. This authentic Roman recipe uses no cream - just perfectly silky eggs and cheese.",
        ingredients: ["spaghetti", "eggs", "pecorino romano cheese", "pancetta", "black pepper", "salt"],
        cookingTime: 20,
        difficulty: "Medium",
        createdAt: Date.now() - 172800000
      },
      {
        id: 3,
        title: "Quick Avocado Toast",
        description: "Healthy and delicious avocado toast perfect for breakfast or a light lunch. Topped with everything bagel seasoning and a drizzle of olive oil.",
        ingredients: ["bread", "avocado", "lemon juice", "salt", "everything bagel seasoning", "olive oil"],
        cookingTime: 5,
        difficulty: "Easy",
        createdAt: Date.now() - 259200000
      },
      {
        id: 4,
        title: "Homemade Pizza Margherita",
        description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil. Made with homemade dough for the perfect crispy yet chewy crust.",
        ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "fresh basil", "olive oil", "garlic", "salt"],
        cookingTime: 45,
        difficulty: "Medium",
        createdAt: Date.now() - 345600000
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
          
          {/* Navigation */}
          <nav style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}
            >
              🏠 Home
            </Link>
            <Link 
              to="/favorites" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}
            >
              ❤️ Favorites
            </Link>
            <Link 
              to="/recommendations" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}
            >
              ⭐ Recommendations
            </Link>
          </nav>
        </header>

        <main style={{
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar />
                <FilterPanel />
                <AddRecipeForm />
                <RecipeList />
              </>
            } />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recommendations" element={<RecommendationsList />} />
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