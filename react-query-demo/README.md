# React Query Demo

A React application demonstrating advanced data fetching and management using TanStack Query (formerly React Query). This demo showcases efficient API interactions, caching, and UI responsiveness optimization.

## Features Implemented

✅ **Automatic Caching** - Data stays fresh for 5 minutes, reducing unnecessary API calls  
✅ **Background Refetching** - Automatically updates stale data in the background  
✅ **Loading and Error States** - Proper handling of loading states and error scenarios  
✅ **Manual Refetch** - Refresh button to manually trigger data updates  
✅ **Network Request Optimization** - Efficient caching reduces redundant API calls  
✅ **Fallback to Mock Data** - Graceful fallback when external API is unavailable  
✅ **React Query Devtools** - Development tools for monitoring cache and queries

## API Integration

This application fetches data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts), a free REST API for testing and prototyping. When the external API is unavailable (e.g., in restricted environments), the app gracefully falls back to mock data to demonstrate all React Query features.

**API Endpoint**: `https://jsonplaceholder.typicode.com/posts`

## Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **TanStack Query v5** - Powerful data synchronization for React
- **React Query Devtools** - Development tools for debugging queries

## Project Structure

```
react-query-demo/
├── src/
│   ├── App.jsx              # Main app with QueryClient setup
│   ├── PostsComponent.jsx   # Component demonstrating React Query features
│   ├── main.jsx            # Application entry point
│   └── App.css             # Styles
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## Key React Query Concepts Demonstrated

### 1. QueryClient Setup
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### 2. Data Fetching with useQuery
```javascript
const { data, isLoading, error, refetch, isFetching } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

### 3. Caching Behavior
- **Fresh Data**: Served instantly from cache for 5 minutes
- **Stale Data**: Triggers background refetch while serving cached data
- **Cache Retention**: Data kept in memory for 10 minutes after last use

### 4. Error Handling & Fallbacks
- Automatic retry with exponential backoff
- Graceful error states with retry options
- Fallback to mock data when external API fails

## Testing the Demo

1. **Loading State**: Refresh the page to see loading spinner
2. **Data Display**: View the 10 posts fetched from API (or mock data)
3. **Manual Refetch**: Click "🔄 Refresh Data" to trigger manual update
4. **Caching**: Navigate away and back to see instant loading from cache
5. **DevTools**: Click the React Query devtools button to inspect cache state
6. **Error Handling**: Simulated when external API is blocked

## Cache Optimization

The application demonstrates React Query's intelligent caching:

- **Reduced Network Requests**: Data is cached and reused efficiently
- **Background Updates**: Stale data is updated automatically
- **Memory Management**: Cache is cleared after configured time
- **Request Deduplication**: Multiple identical requests are automatically deduplicated

## Development Tools

The included React Query Devtools provide insights into:
- Query states (Fresh, Fetching, Stale, Inactive)
- Cache contents and timing
- Network request patterns
- Query invalidation and refetching

## Build and Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

This project demonstrates best practices for data fetching in React applications using TanStack Query, showcasing how to build responsive, efficient, and user-friendly interfaces with proper caching and error handling.
