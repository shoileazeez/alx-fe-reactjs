import { useParams, Link, useNavigate } from 'react-router-dom'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Mock blog posts data
  const blogPosts = {
    'react-router-tutorial': {
      title: 'React Router Tutorial',
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '5 min read',
      content: `
        React Router is a powerful library for handling navigation in React applications. 
        In this tutorial, we'll explore the basic concepts and advanced features that make 
        routing in React applications seamless and efficient.
        
        ## Getting Started
        
        To get started with React Router, you first need to install the package:
        
        \`npm install react-router-dom\`
        
        ## Basic Setup
        
        The foundation of React Router lies in the BrowserRouter component, which provides 
        the routing functionality to your entire application.
        
        ## Advanced Features
        
        React Router offers many advanced features including:
        - Nested routing
        - Dynamic routes
        - Protected routes
        - Route guards
        - Navigation programmatically
      `,
      tags: ['React', 'Tutorial', 'Web Development']
    },
    'advanced-routing-techniques': {
      title: 'Advanced Routing Techniques',
      author: 'Jane Smith',
      date: '2024-01-10',
      readTime: '8 min read',
      content: `
        Advanced routing techniques can significantly improve the user experience 
        and structure of your React applications. Let's dive into some sophisticated 
        patterns and practices.
        
        ## Nested Routes
        
        Nested routes allow you to create complex layouts where different parts of 
        the UI are controlled by different route segments.
        
        ## Dynamic Routing
        
        Dynamic routing enables you to create routes that respond to variable 
        parameters, perfect for user-generated content.
        
        ## Route Protection
        
        Implementing authentication and authorization through protected routes 
        ensures secure access to sensitive areas of your application.
      `,
      tags: ['React Router', 'Advanced', 'Best Practices']
    },
    'nested-routes-guide': {
      title: 'Nested Routes Guide',
      author: 'Mike Johnson',
      date: '2024-01-05',
      readTime: '6 min read',
      content: `
        Nested routes are one of the most powerful features of React Router. 
        They allow you to build complex user interfaces with multiple levels 
        of navigation.
        
        ## What are Nested Routes?
        
        Nested routes enable you to render child components within parent 
        components based on the URL structure.
        
        ## Implementation
        
        To implement nested routes, you use the Routes and Route components 
        within your parent component.
        
        ## Best Practices
        
        - Keep your route structure intuitive
        - Use meaningful URL segments
        - Implement proper error boundaries
        - Consider loading states
      `,
      tags: ['React Router', 'Nested Routes', 'UI Architecture']
    }
  }

  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="blog-post">
        <div className="post-not-found">
          <h1>Post Not Found</h1>
          <p>The blog post "{slug}" could not be found.</p>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post">
      <article>
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="author">By {post.author}</span>
            <span className="date">{post.date}</span>
            <span className="read-time">{post.readTime}</span>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>
        
        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim().startsWith('##')) {
              return <h2 key={index}>{paragraph.replace('##', '').trim()}</h2>
            }
            if (paragraph.trim().startsWith('`') && paragraph.trim().endsWith('`')) {
              return <code key={index} className="code-block">{paragraph.slice(1, -1)}</code>
            }
            if (paragraph.trim()) {
              return <p key={index}>{paragraph.trim()}</p>
            }
            return null
          })}
        </div>
        
        <footer className="post-footer">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            ← Back
          </button>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </footer>
      </article>
    </div>
  )
}

export default BlogPost