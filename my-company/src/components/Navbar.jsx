import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          MyCompany
        </div>
        
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '30px'
        }}>
          <li>
            <Link 
              to="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '10px 15px',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
