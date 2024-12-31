import React from 'react';
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

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const AchievementItem = styled.li`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Achievements = () => {
  const achievements = JSON.parse(localStorage.getItem('achievements')) || [];

  return (
    <Container>
      <Title>Achievements</Title>
      <AchievementList>
        {achievements.map((achievement, index) => (
          <AchievementItem key={index}>
            <span>{achievement.name}</span>
            <span>{achievement.date}</span>
          </AchievementItem>
        ))}
      </AchievementList>
    </Container>
  );
};

export default Achievements;