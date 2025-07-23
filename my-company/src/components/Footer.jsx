function Footer() {
  return (
    <footer style={{
      backgroundColor: '#34495e',
      color: 'white',
      padding: '40px 0 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.3rem',
              marginBottom: '15px',
              color: '#3498db'
            }}>
              MyCompany
            </h3>
            <p style={{
              color: '#bdc3c7',
              lineHeight: '1.6'
            }}>
              Leading the way in innovation and excellence. We provide 
              top-quality services to help your business thrive.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              marginBottom: '15px',
              color: '#ecf0f1'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Home</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/about" style={{ color: '#bdc3c7', textDecoration: 'none' }}>About</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/services" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Services</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/contact" style={{ color: '#bdc3c7', textDecoration: 'none' }}>Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              marginBottom: '15px',
              color: '#ecf0f1'
            }}>
              Contact Info
            </h4>
            <div style={{ color: '#bdc3c7', lineHeight: '1.8' }}>
              <p style={{ margin: '5px 0' }}>📧 info@mycompany.com</p>
              <p style={{ margin: '5px 0' }}>📞 (555) 123-4567</p>
              <p style={{ margin: '5px 0' }}>📍 123 Business St, City, State 12345</p>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #7f8c8d',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#bdc3c7',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: 0 }}>
            © 2025 MyCompany. All rights reserved. | Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
