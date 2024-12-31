export const saveAchievement = (name) => {
    const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    const newAchievement = { name, date: new Date().toLocaleDateString() };
    achievements.push(newAchievement);
    localStorage.setItem('achievements', JSON.stringify(achievements));
  };
  
  export const getAchievements = () => {
    return JSON.parse(localStorage.getItem('achievements')) || [];
  };