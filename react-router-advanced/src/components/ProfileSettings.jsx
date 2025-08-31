import { useState } from 'react'

const ProfileSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  })
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false
  })

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handlePrivacyChange = (setting, value) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      
      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            Email Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
            Push Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange('sms')}
            />
            SMS Notifications
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Privacy Settings</h3>
        <div className="setting-item">
          <label htmlFor="visibility">Profile Visibility:</label>
          <select
            id="visibility"
            value={privacy.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
            />
            Show Email Publicly
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={privacy.showPhone}
              onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
            />
            Show Phone Publicly
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={handleSave} className="btn btn-primary">
          Save Settings
        </button>
        <button className="btn btn-secondary">
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings