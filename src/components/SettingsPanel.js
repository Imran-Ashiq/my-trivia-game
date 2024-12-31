import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const SettingsPanel = ({ onSettingsChange }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    onSettingsChange({ darkMode, language });
  }, [darkMode, language, onSettingsChange]);

  const handleDarkModeChange = (e) => {
    setDarkMode(e.target.checked);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <Panel>
      <h2>Settings</h2>
      <label>
        Dark Mode:
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeChange} />
      </label>
      <br />
      <label>
        Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages as needed */}
        </select>
      </label>
    </Panel>
  );
};

export default SettingsPanel;