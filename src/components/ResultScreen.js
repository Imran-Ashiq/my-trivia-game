import React from 'react';
import styled from 'styled-components';
import Leaderboard from './Leaderboard';
import Achievements from './Achievements';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const ScoreText = styled.p`
  font-size: 1.5em;
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
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

const ResultScreen = ({ score, playAgain }) => {
  const shareScore = () => {
    const url = `https://twitter.com/intent/tweet?text=I scored ${score} points in the Trivia Game! Can you beat my score?`;
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Title>Game Over</Title>
      <ScoreText>Your final score is: {score}</ScoreText>
      <Button onClick={playAgain}>Play Again</Button>
      <Button onClick={shareScore}>Share Score</Button>
      <Leaderboard />
      <Achievements />
    </Container>
  );
};

export default ResultScreen;