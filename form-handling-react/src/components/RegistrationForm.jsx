import { useState } from 'react';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Original form submitted:', { username, email, password, confirmPassword });
            alert('Original form submitted successfully!');
            // Reset form
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors({});
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Registration Form (Original)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.username ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    {errors.username && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.username}
                        </div>
                    )}
                </div>

                <div>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.email ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    {errors.email && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.email}
                        </div>
                    )}
                </div>

                <div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.password ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    {errors.password && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.password}
                        </div>
                    )}
                </div>

                <div>
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.confirmPassword ? '1px solid #dc3545' : '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    {errors.confirmPassword && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.confirmPassword}
                        </div>
                    )}
                </div>

                <button 
                    type="submit"
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;