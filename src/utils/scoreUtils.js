export const saveScore = (score) => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem('scores', JSON.stringify(scores.slice(0, 10)));
  };
  
  export const getScores = () => {
    return JSON.parse(localStorage.getItem('scores')) || [];
  };