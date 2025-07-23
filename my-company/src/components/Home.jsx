function Home() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh'
    }}>
      <h1 style={{
        color: '#2c3e50',
        fontSize: '3rem',
        marginBottom: '20px'
      }}>
        Welcome to Our Company
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#7f8c8d',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        We are a leading company dedicated to providing innovative solutions 
        and exceptional services to our clients worldwide. Welcome to our 
        digital home where excellence meets innovation.
      </p>
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '40px auto'
      }}>
        <h2 style={{ color: '#34495e' }}>Why Choose Us?</h2>
        <p style={{ color: '#7f8c8d' }}>
          With years of experience and a commitment to excellence, we deliver 
          results that exceed expectations.
        </p>
      </div>
    </div>
  );
}

export default Home;
