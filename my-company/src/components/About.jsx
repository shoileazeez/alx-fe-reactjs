function About() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ecf0f1',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          About Our Company
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#34495e', fontSize: '1.8rem' }}>Our Story</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            Founded in 1990, our company has been at the forefront of innovation 
            and excellence. We started as a small team with big dreams and have 
            grown into a trusted partner for businesses worldwide.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#34495e', fontSize: '1.8rem' }}>Our Mission</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            To deliver innovative solutions that empower businesses to achieve 
            their goals while maintaining the highest standards of quality and 
            customer satisfaction.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#34495e', fontSize: '1.8rem' }}>Our Values</h2>
          <ul style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            lineHeight: '1.8'
          }}>
            <li>Innovation and creativity</li>
            <li>Customer-centric approach</li>
            <li>Integrity and transparency</li>
            <li>Continuous improvement</li>
            <li>Team collaboration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;