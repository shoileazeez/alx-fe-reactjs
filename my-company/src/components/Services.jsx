function Services() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Our Services
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#3498db', fontSize: '1.5rem', marginBottom: '15px' }}>
              Technology Consulting
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Expert guidance on technology strategy, digital transformation, 
              and system architecture to help your business stay competitive.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '15px' }}>
              Market Analysis
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Comprehensive market research and analysis to identify opportunities 
              and develop effective business strategies.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#27ae60', fontSize: '1.5rem', marginBottom: '15px' }}>
              Product Development
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              End-to-end product development services from concept to launch, 
              ensuring quality and market readiness.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#f39c12', fontSize: '1.5rem', marginBottom: '15px' }}>
              Digital Marketing
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Strategic digital marketing campaigns to boost your online presence 
              and drive customer engagement.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#9b59b6', fontSize: '1.5rem', marginBottom: '15px' }}>
              Business Consulting
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Strategic business consulting to optimize operations and drive 
              sustainable growth for your organization.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#1abc9c', fontSize: '1.5rem', marginBottom: '15px' }}>
              Support & Maintenance
            </h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Ongoing support and maintenance services to ensure your systems 
              run smoothly and efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;