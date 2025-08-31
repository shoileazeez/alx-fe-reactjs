import { Link } from 'react-router-dom'

const Home = () => {
  const blogPosts = [
    { slug: 'react-router-tutorial', title: 'React Router Tutorial', date: '2024-01-15' },
    { slug: 'advanced-routing-techniques', title: 'Advanced Routing Techniques', date: '2024-01-10' },
    { slug: 'nested-routes-guide', title: 'Nested Routes Guide', date: '2024-01-05' }
  ]

  return (
    <div className="home">
      <h1>Welcome to React Router Advanced</h1>
      <p>This application demonstrates advanced routing techniques including:</p>
      <ul className="features-list">
        <li>✅ Nested routing with Profile component</li>
        <li>✅ Dynamic routing for blog posts</li>
        <li>✅ Protected routes with authentication</li>
        <li>✅ Route guards and redirects</li>
      </ul>

      <h2>Recent Blog Posts</h2>
      <div className="blog-posts">
        {blogPosts.map(post => (
          <div key={post.slug} className="blog-post-card">
            <h3>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="post-date">{post.date}</p>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <Link to="/profile" className="btn btn-primary">
          View Profile (Protected Route)
        </Link>
      </div>
    </div>
  )
}

export default Home