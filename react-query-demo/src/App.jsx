import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';
import './App.css'

// Create a client instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed requests 3 times
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px 0'
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '30px',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: '#2c3e50',
            margin: '0 0 10px 0',
            fontSize: '2.5rem'
          }}>
            React Query Demo
          </h1>
          <p style={{ 
            color: '#7f8c8d',
            margin: 0,
            fontSize: '1.1rem'
          }}>
            Advanced Data Fetching and Management with TanStack Query
          </p>
        </header>
        
        <main>
          <PostsComponent />
        </main>
      </div>
      
      {/* React Query Devtools - only shows in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
