import axios from 'axios';

// Function to fetch user data from GitHub API
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};

// Function for advanced user search
export const searchUsers = async (searchParams) => {
  try {
    const { username, location, minRepos, page = 1, perPage = 30 } = searchParams;
    
    // Build search query
    let query = '';
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;
    
    // Remove trailing space and ensure we have a query
    query = query.trim();
    if (!query) query = 'type:user'; // Default query if no params provided
    
    const response = await axios.get(`https://api.github.com/search/users`, {
      params: {
        q: query,
        page,
        per_page: perPage
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching GitHub users:', error);
    throw error;
  }
};