import React, { useState, Suspense, lazy } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import logo from './my-logo.png';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const QuestionScreen = lazy(() => import('./components/QuestionScreen'));
const ResultScreen = lazy(() => import('./components/ResultScreen'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const Profile = lazy(() => import('./components/Profile'));
const Achievements = lazy(() => import('./components/Achievements'));

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.color};
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const lightTheme = {
  background: '#f0f0f0',
  color: '#000',
};

const darkTheme = {
  background: '#333',
  color: '#fff',
};

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [category, setCategory] = useState('');
  const [gameMode, setGameMode] = useState('time-based');
  const [timeLimit, setTimeLimit] = useState(30);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const startGame = (selectedCategory, selectedGameMode, selectedTimeLimit) => {
    setCategory(selectedCategory);
    setGameMode(selectedGameMode);
    setTimeLimit(selectedTimeLimit);
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
  };

  const endGame = (finalScore) => {
    setScore(finalScore);
    setGameStarted(false);
    setGameEnded(true);
  };

  const playAgain = () => {
    setGameStarted(false);
    setGameEnded(false);
    setScore(0);
  };

  const handleProfileSave = (profile) => {
    // Handle profile save
  };

  const handleContinue = () => {
    setProfileCompleted(true);
  };

  const handleSettingsChange = (newSettings) => {
    setDarkMode(newSettings.darkMode);
    setLanguage(newSettings.language);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          {!profileCompleted ? (
            <Profile onProfileSave={handleProfileSave} onContinue={handleContinue} />
          ) : !gameStarted && !gameEnded ? (
            <div>
              <Logo src={logo} alt="Logo" />
              <HomeScreen startGame={startGame} />
              <Leaderboard />
              <Achievements />
            </div>
          ) : gameStarted ? (
            <QuestionScreen
              category={category}
              gameMode={gameMode}
              timeLimit={timeLimit}
              endGame={endGame}
              darkMode={darkMode}
              language={language}
              onSettingsChange={handleSettingsChange}
            />
          ) : (
            <ResultScreen score={score} playAgain={playAgain} />
          )}
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
