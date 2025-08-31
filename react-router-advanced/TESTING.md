# React Router Advanced - Manual Testing Guide

## Testing Instructions

### 1. Authentication Testing
1. Navigate to http://localhost:5173/profile
2. You should be redirected to /login (demonstrates protected routes)
3. Login with credentials: username: `user`, password: `password`
4. After login, you should be redirected back to the profile page

### 2. Dynamic Routing Testing
- Valid blog posts:
  - http://localhost:5173/blog/react-router-tutorial
  - http://localhost:5173/blog/advanced-routing-techniques  
  - http://localhost:5173/blog/nested-routes-guide
- Invalid blog post (404 demo):
  - http://localhost:5173/blog/non-existent-post

### 3. Nested Routing Testing (when authenticated)
- http://localhost:5173/profile - Profile overview
- http://localhost:5173/profile/details - User details
- http://localhost:5173/profile/settings - User settings

### 4. Features Demonstrated
✅ Nested routing with Profile component sub-routes
✅ Dynamic routing for blog posts with URL parameters
✅ Protected routes with authentication guards
✅ Route redirects and error handling
✅ Persistent authentication state (localStorage)
✅ Context-aware navigation
✅ Professional UI with responsive design

## Authentication Bypass for Testing Nested Routes

To test nested routes directly, you can temporarily set authentication in localStorage:

```javascript
// In browser console:
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('user', JSON.stringify({name: 'test', id: 1}));
// Then refresh the page
```

This will allow direct access to:
- /profile (overview)
- /profile/details (user details)
- /profile/settings (user preferences)