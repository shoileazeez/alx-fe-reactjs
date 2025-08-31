import { useQuery } from '@tanstack/react-query';

// Mock data as fallback when external API is not available
const mockPosts = [
  {
    id: 1,
    userId: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    id: 2,
    userId: 1,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    id: 3,
    userId: 1,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    id: 4,
    userId: 1,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    id: 5,
    userId: 1,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    id: 6,
    userId: 1,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    id: 7,
    userId: 1,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  },
  {
    id: 8,
    userId: 1,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
    id: 9,
    userId: 1,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
  },
  {
    id: 10,
    userId: 1,
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  }
];

// Function to fetch posts from JSONPlaceholder API with fallback to mock data
const fetchPosts = async () => {
  try {
    console.log('Attempting to fetch from JSONPlaceholder API...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Successfully fetched from API');
    return data;
  } catch (error) {
    console.log('API fetch failed, using mock data:', error.message);
    // Simulate network delay even with mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPosts;
  }
};

function PostsComponent() {
  // Using React Query's useQuery hook to fetch data
  const { 
    data: posts, 
    isLoading, 
    error, 
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes - cache kept for 10 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ 
          fontSize: '18px', 
          color: '#666',
          marginBottom: '10px' 
        }}>
          Loading posts...
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        color: '#e74c3c',
        backgroundColor: '#fdf2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h3>Error loading posts</h3>
        <p>{error.message}</p>
        <button 
          onClick={() => refetch()}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #ecf0f1',
        paddingBottom: '20px'
      }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Posts from JSONPlaceholder API</h1>
        <button 
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            backgroundColor: isFetching ? '#95a5a6' : '#27ae60',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: isFetching ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isFetching ? 'Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>React Query Demo Features:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
          <li>✅ Automatic caching (data stays for 5 minutes when fresh)</li>
          <li>✅ Background refetching when data becomes stale</li>
          <li>✅ Loading and error states</li>
          <li>✅ Manual refetch with the refresh button</li>
          <li>✅ Network request optimization</li>
          <li>✅ Fallback to mock data when API is unavailable</li>
        </ul>
      </div>

      <div style={{ color: '#6c757d', marginBottom: '20px', fontSize: '14px' }}>
        Total posts loaded: <strong>{posts?.length || 0}</strong>
        {isFetching && <span style={{ color: '#007bff' }}> (Updating...)</span>}
        <br />
        <small style={{ color: '#28a745' }}>
          📡 Data source: {posts?.length > 10 ? 'JSONPlaceholder API' : 'Mock Data (API fallback)'}
        </small>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {posts?.slice(0, 10).map((post) => (
          <div 
            key={post.id} 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e9ecef',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={{ 
              color: '#2c3e50',
              fontSize: '16px',
              marginBottom: '10px',
              lineHeight: '1.4'
            }}>
              {post.title}
            </h3>
            <p style={{ 
              color: '#7f8c8d',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: 0
            }}>
              {post.body}
            </p>
            <div style={{ 
              marginTop: '10px',
              fontSize: '12px',
              color: '#95a5a6'
            }}>
              Post ID: {post.id} | User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center',
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#2d5d2d'
      }}>
        💡 <strong>Tip:</strong> Navigate away from this component and come back to see caching in action! 
        The data will load instantly from cache if it's still fresh.
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default PostsComponent;