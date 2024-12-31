import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Select = styled.select`
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

const HomeScreen = ({ startGame }) => {
  const [category, setCategory] = useState('');
  const [gameMode, setGameMode] = useState('time-based');
  const [timeLimit, setTimeLimit] = useState(30);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleGameModeChange = (e) => {
    setGameMode(e.target.value);
  };

  const handleTimeLimitChange = (e) => {
    setTimeLimit(e.target.value);
  };

  const handleStartGame = () => {
    startGame(category, gameMode, timeLimit);
  };

  return (
    <Container>
      <Title>Trivia Game</Title>
      <Label>
        Select Category:
        <Select value={category} onChange={handleCategoryChange}>
          <option value="">Select</option>
          <option value="9">General Knowledge</option>
          <option value="17">Science & Nature</option>
          <option value="23">History</option>
          <option value="19">Mathematics</option>
        </Select>
      </Label>
      <Label>
        Select Game Mode:
        <Select value={gameMode} onChange={handleGameModeChange}>
          <option value="time-based">Time-based</option>
          <option value="endless">Endless</option>
          <option value="hard">Hard</option>
        </Select>
      </Label>
      {gameMode === 'time-based' && (
        <Label>
          Select Time Limit:
          <Select value={timeLimit} onChange={handleTimeLimitChange}>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={90}>90 seconds</option>
          </Select>
        </Label>
      )}
      <Button onClick={handleStartGame}>Start Game</Button>
    </Container>
  );
};

export default HomeScreen;