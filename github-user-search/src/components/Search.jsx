import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import './Search.css';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="results-container">
        {isLoading && <p className="loading-message">Loading...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {userData && !isLoading && !error && (
          <div className="user-card">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`} 
              className="user-avatar"
            />
            <div className="user-info">
              <h2>{userData.name || userData.login}</h2>
              <p>{userData.bio}</p>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;