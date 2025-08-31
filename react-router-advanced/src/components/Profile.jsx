import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ProfileDetails from './ProfileDetails'
import ProfileSettings from './ProfileSettings'

const Profile = () => {
  const location = useLocation()

  return (
    <div className="profile">
      <h1>User Profile</h1>
      
      <nav className="profile-nav">
        <Link 
          to="/profile" 
          className={location.pathname === '/profile' ? 'active' : ''}
        >
          Overview
        </Link>
        <Link 
          to="/profile/details" 
          className={location.pathname === '/profile/details' ? 'active' : ''}
        >
          Details
        </Link>
        <Link 
          to="/profile/settings" 
          className={location.pathname === '/profile/settings' ? 'active' : ''}
        >
          Settings
        </Link>
      </nav>

      <div className="profile-content">
        <Routes>
          <Route 
            index 
            element={
              <div className="profile-overview">
                <h2>Profile Overview</h2>
                <p>Welcome to your profile page! Navigate to the tabs above to manage your information.</p>
                <div className="quick-stats">
                  <div className="stat-card">
                    <h3>Profile Completion</h3>
                    <p>85%</p>
                  </div>
                  <div className="stat-card">
                    <h3>Last Login</h3>
                    <p>Today</p>
                  </div>
                </div>
              </div>
            } 
          />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  )
}

export default Profile