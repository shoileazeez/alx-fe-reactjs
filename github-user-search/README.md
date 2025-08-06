# GitHub User Search Application

A modern, responsive React application for searching GitHub users with both basic and advanced search capabilities.

## Features

### Basic Search
- Search for individual GitHub users by username
- Display comprehensive user profile information
- View user statistics (repositories, followers, following)
- Direct link to GitHub profile

### Advanced Search
- Search users by multiple criteria:
  - Username (partial matching)
  - Location
  - Minimum number of repositories
- Display paginated results
- Load more functionality for browsing additional results
- Rich user cards with profile information

## Technology Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **GitHub API v3** - Data source

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-user-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_APP_GITHUB_API_KEY=your_github_personal_access_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## GitHub Personal Access Token

To use this application, you'll need a GitHub Personal Access Token:

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token (classic)
3. No special scopes are required for public user data
4. Add the token to your `.env` file

## Project Structure

```
src/
├── components/
│   └── Search.jsx          # Main search component
├── services/
│   └── githubService.js    # GitHub API integration
├── App.jsx                 # Root component
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind
```

## API Integration

The application uses two main GitHub API endpoints:

### Individual User Data
```
GET /users/{username}
```

### User Search
```
GET /search/users?q={query}
```

Search query supports:
- `username in:login` - Search in usernames
- `location:city` - Filter by location
- `repos:>=n` - Filter by minimum repository count

## Features in Detail

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### Search Modes
- **Basic Mode**: Simple username search with detailed profile view
- **Advanced Mode**: Multi-criteria search with grid results

### User Experience
- Loading states with spinners
- Error handling with user-friendly messages
- Pagination with "Load More" functionality
- Search mode toggle for easy switching

### Accessibility
- Semantic HTML structure
- Proper form labels and descriptions
- Keyboard navigation support
- Focus management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_APP_GITHUB_API_KEY` | GitHub Personal Access Token | Yes |

## Build and Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
