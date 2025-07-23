import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been received. We'll get back to you at ${formData.email} soon.`);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ecf0f1',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: '600px',
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
          Contact Us
        </h1>
        
        <p style={{
          color: '#7f8c8d',
          fontSize: '1.1rem',
          textAlign: 'center',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#34495e',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#34495e',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#34495e',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #bdc3c7',
                borderRadius: '5px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Send Message
          </button>
        </form>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>Other Ways to Reach Us</h3>
          <p style={{ color: '#7f8c8d', margin: '5px 0' }}>📧 Email: info@mycompany.com</p>
          <p style={{ color: '#7f8c8d', margin: '5px 0' }}>📞 Phone: (555) 123-4567</p>
          <p style={{ color: '#7f8c8d', margin: '5px 0' }}>📍 Address: 123 Business St, City, State 12345</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;