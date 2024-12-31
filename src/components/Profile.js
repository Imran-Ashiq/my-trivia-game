import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 5px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Profile = ({ onProfileSave, onContinue }) => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
      setUsername(savedProfile.username);
    }
  }, []);

  const handleSaveProfile = () => {
    const newProfile = { username };
    localStorage.setItem('profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    onProfileSave(newProfile);
  };

  return (
    <Container>
      <Title>Profile</Title>
      {profile ? (
        <div>
          <p>Welcome, {profile.username}!</p>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      ) : (
        <div>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      )}
    </Container>
  );
};

export default Profile;