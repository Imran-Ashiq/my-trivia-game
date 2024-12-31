import React from 'react';
import styled from 'styled-components';
import { getScores } from '../utils/scoreUtils';

const Container = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const ScoreList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const ScoreItem = styled.li`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
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

const Leaderboard = () => {
  const scores = getScores();

  const shareLeaderboard = () => {
    const url = `https://your-game-url.com/leaderboard`;
    window.open(`https://twitter.com/intent/tweet?text=Check out the leaderboard for the Trivia Game! ${url}`, '_blank');
  };

  return (
    <Container>
      <Title>Leaderboard</Title>
      <ScoreList>
        {scores.map((score, index) => (
          <ScoreItem key={index}>
            <span>Player {index + 1}</span>
            <span>{score}</span>
          </ScoreItem>
        ))}
      </ScoreList>
      <Button onClick={shareLeaderboard}>Share Leaderboard</Button>
    </Container>
  );
};

export default Leaderboard;