import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import './App.css';

const clientId = '51767024702-lgrto4ana7qprqn4fpga0cat5v9n4ig8.apps.googleusercontent.com'; // generated on Google OAuth

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const onSuccess = (res) => {
    // Store the user profile in local storage
    localStorage.setItem('profile', JSON.stringify(res.profileObj));
    setProfile(res.profileObj);
  };

  const onFailure = (err) => {
    console.log('Login failed:', err);
  };

  const logOut = () => {
    googleLogout(); 
    localStorage.removeItem('profile');
    setProfile(null);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="app-container">
          <h1>Welcome to My OIDC App</h1>
          {profile ? (
            <div>
              <img src={profile.imageUrl} alt="Profile" />
              <p>Hello, {profile.name}!</p>
              <p>Email: {profile.email}</p>
              <button onClick={logOut}>Log out</button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onFailure}
            />
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;