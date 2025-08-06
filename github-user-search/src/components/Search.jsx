import React, { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchMode, setSearchMode] = useState('basic'); // 'basic' or 'advanced'
  const [username, setUsername] = useState('');
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAdvancedInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setUserData(null);
    setUsers([]);
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchParams.username && !searchParams.location && !searchParams.minRepos) {
      setError('Please enter at least one search criteria');
      return;
    }

    setIsLoading(true);
    setError(null);
    setUserData(null);
    setUsers([]);
    setCurrentPage(1);

    try {
      const data = await searchUsers({ ...searchParams, page: 1 });
      setUsers(data.items || []);
      setTotalCount(data.total_count || 0);
      setHasMore(data.items && data.items.length === 30 && data.total_count > 30);
    } catch (err) {
      setError('Error searching users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    try {
      const data = await searchUsers({ ...searchParams, page: nextPage });
      setUsers(prev => [...prev, ...(data.items || [])]);
      setCurrentPage(nextPage);
      setHasMore(data.items && data.items.length === 30 && users.length + data.items.length < totalCount);
    } catch (err) {
      setError('Error loading more users');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode) => {
    setSearchMode(mode);
    setError(null);
    setUserData(null);
    setUsers([]);
    setUsername('');
    setSearchParams({ username: '', location: '', minRepos: '' });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        GitHub User Search
      </h1>

      {/* Search Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => switchMode('basic')}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              searchMode === 'basic'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Basic Search
          </button>
          <button
            onClick={() => switchMode('advanced')}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              searchMode === 'advanced'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Basic Search Form */}
      {searchMode === 'basic' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleBasicSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      )}

      {/* Advanced Search Form */}
      {searchMode === 'advanced' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleAdvancedSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchParams.username}
                  onChange={handleAdvancedInputChange}
                  placeholder="Enter username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchParams.location}
                  onChange={handleAdvancedInputChange}
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                  Min Repositories
                </label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleAdvancedInputChange}
                  placeholder="Minimum repos"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Searching...' : 'Search Users'}
            </button>
          </form>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Basic Search Results */}
      {userData && !isLoading && searchMode === 'basic' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`} 
              className="w-24 h-24 rounded-full mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {userData.name || userData.login}
              </h2>
              <p className="text-gray-600 mb-2">@{userData.login}</p>
              {userData.bio && (
                <p className="text-gray-700 mb-4">{userData.bio}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="text-center">
                  <span className="block font-semibold text-gray-800">{userData.public_repos || 0}</span>
                  <span className="text-gray-600">Repositories</span>
                </div>
                <div className="text-center">
                  <span className="block font-semibold text-gray-800">{userData.followers || 0}</span>
                  <span className="text-gray-600">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block font-semibold text-gray-800">{userData.following || 0}</span>
                  <span className="text-gray-600">Following</span>
                </div>
                {userData.location && (
                  <div className="text-center">
                    <span className="block font-semibold text-gray-800">{userData.location}</span>
                    <span className="text-gray-600">Location</span>
                  </div>
                )}
              </div>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {searchMode === 'advanced' && totalCount > 0 && (
        <div className="mb-4 text-gray-600">
          Found {totalCount} users
        </div>
      )}

      {searchMode === 'advanced' && users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
              <div className="flex items-center mb-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.login}</h3>
                  <p className="text-gray-600 text-sm">{user.type}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><span className="font-medium">Score:</span> {Math.round(user.score * 100) / 100}</p>
                {user.location && (
                  <p><span className="font-medium">Location:</span> {user.location}</p>
                )}
              </div>
              
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition duration-200"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {searchMode === 'advanced' && hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* No Results */}
      {!isLoading && searchMode === 'advanced' && users.length === 0 && totalCount === 0 && searchParams.username && (
        <div className="text-center text-gray-500 mt-8">
          <p>No users found. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Search;