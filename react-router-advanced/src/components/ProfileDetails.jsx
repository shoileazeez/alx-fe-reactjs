import { useAuth } from './AuthContext'

const ProfileDetails = () => {
  const { user } = useAuth()

  const userDetails = {
    name: user?.name || 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2023-06-15',
    bio: 'Full-stack developer passionate about React and modern web technologies.'
  }

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="details-grid">
        <div className="detail-item">
          <label>Full Name:</label>
          <span>{userDetails.name}</span>
        </div>
        <div className="detail-item">
          <label>Email:</label>
          <span>{userDetails.email}</span>
        </div>
        <div className="detail-item">
          <label>Phone:</label>
          <span>{userDetails.phone}</span>
        </div>
        <div className="detail-item">
          <label>Location:</label>
          <span>{userDetails.location}</span>
        </div>
        <div className="detail-item">
          <label>Member Since:</label>
          <span>{userDetails.joinDate}</span>
        </div>
        <div className="detail-item bio">
          <label>Bio:</label>
          <p>{userDetails.bio}</p>
        </div>
      </div>
      <button className="btn btn-secondary">Edit Details</button>
    </div>
  )
}

export default ProfileDetails