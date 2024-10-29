import React, { useState } from 'react';
import'./assets/homepage.css'

const Homepage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleApplyChanges = () => {

    console.log('hey saikat ');
  };

  return (
    <div className="profile-edit-container">
      <header className="header">
        <span>&lt; Create Profile</span>
      </header>
      
      <div className="profile-pic-section">
        <img
          src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202410/shah-rukh-khan-scored-very-high-for-his-lips-and-square-chin-photo-getty-images-174536184-16x9_0.jpg?VersionId=gwLpn7cjWUP7UQLJNDHxTdd6qGwdrO9n&size=690:388"
          alt="Profile"
          className="profile-pic"
        />
      
      </div>

      {/* <div className="form-group">
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div> */}

      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <input 
          type="text" 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
        />
      </div>

      <button className="apply-btn" onClick={handleApplyChanges}>
        Apply Changes
      </button>
    </div>
  );
};

export default Homepage;
