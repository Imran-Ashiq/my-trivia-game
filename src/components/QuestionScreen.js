import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import correctSound from '../sounds/correct.mp3';
import incorrectSound from '../sounds/incorrect.mp3';
import backgroundMusic from '../sounds/background.mp3';
import SettingsPanel from './SettingsPanel';

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

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const QuestionCard = styled(motion.div)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const QuestionText = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const AnswerButton = styled.button`
  background: ${props => (props.$correct ? '#28a745' : props.$incorrect ? '#dc3545' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${props => (props.$correct ? '#218838' : props.$incorrect ? '#c82333' : '#0056b3')};
  }

  &:focus {
    outline: 3px solid #ffbf47;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin: 3px;
  }
`;

const Timer = styled.p`
  font-size: 1em;
  color: ${props => props.theme.color};

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const Score = styled.p`
  font-size: 1em;
  color: ${props => props.theme.color};

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Progress = styled(motion.div)`
  height: 10px;
  background-color: #007bff;
`;

const TimerBar = styled(motion.div)`
  height: 10px;
  background-color: #ff0000;
`;

const SettingsButton = styled.button`
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

const HintButton = styled.button`
  background: #ffc107;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: #e0a800;
  }
`;

const QuestionScreen = ({ category, gameMode, timeLimit, endGame, darkMode, language, onSettingsChange }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(gameMode === 'hard' ? 15 : timeLimit);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [playCorrect] = useSound(correctSound);
  const [playIncorrect] = useSound(incorrectSound);
  const [playBackground, { stop }] = useSound(backgroundMusic, { loop: true });

  useEffect(() => {
    playBackground();
    return () => stop();
  }, [playBackground, stop]);

  useEffect(() => {
    const fetchQuestions = async (retryCount = 0) => {
      try {
        const cachedQuestions = localStorage.getItem(`questions_${category}`);
        if (cachedQuestions) {
          setQuestions(JSON.parse(cachedQuestions));
          setLoading(false);
          return;
        }

        const url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
        console.log('Fetching questions from URL:', url); // Debugging log
        const response = await fetch(url);
        if (response.status === 429 && retryCount < 3) {
          console.warn('Rate limit exceeded, retrying...');
          setTimeout(() => fetchQuestions(retryCount + 1), 1000); // Retry after 1 second
          return;
        }
        const data = await response.json();
        console.log('API response:', data); // Debugging log
        if (data.results && data.results.length > 0) {
          setQuestions(data.results);
          localStorage.setItem(`questions_${category}`, JSON.stringify(data.results));
          setLoading(false);
        } else {
          throw new Error('No questions found');
        }
      } catch (error) {
        console.error('Error fetching questions:', error); // Debugging log
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
    setTimeout(() => {
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);
      handleNextQuestion();
    }, 2000);
  };

  const handleHint = () => {
    setHintUsed(true);
    // Logic to provide a hint (e.g., eliminate one incorrect answer)
  };

  const handleNextQuestion = () => {
    if (questions.length > 0 && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(gameMode === 'hard' ? 15 : timeLimit);
    } else {
      endGame(score);
    }
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  if (loading) {
    return (
      <Container>
        <ClipLoader size={150} color={"#007bff"} loading={loading} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort() : [];

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const timerProgress = (timer / timeLimit) * 100;

  return (
    <Container>
      <QuestionCard
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <ProgressBar>
          <Progress initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </ProgressBar>
        <TimerBar initial={{ width: '100%' }} animate={{ width: `${timerProgress}%` }} />
        <h2>Question {currentQuestionIndex + 1}</h2>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <div role="group" aria-labelledby="question">
          {answers.map((answer, index) => (
            <AnswerButton
              key={index}
              onClick={() => handleAnswer(answer)}
              $correct={showCorrectAnswer && answer === currentQuestion.correct_answer}
              $incorrect={showCorrectAnswer && answer === selectedAnswer && answer !== currentQuestion.correct_answer}
              aria-pressed={selectedAnswer === answer}
              aria-label={`Answer ${index + 1}: ${answer}`}
            >
              {answer}
            </AnswerButton>
          ))}
        </div>
        {!hintUsed && <HintButton onClick={handleHint}>Hint</HintButton>}
        <Timer>Time left: {timer} seconds</Timer>
        <Score>Score: {score}</Score>
        <SettingsButton onClick={toggleSettings}>Settings</SettingsButton>
        {settingsOpen && <SettingsPanel onSettingsChange={onSettingsChange} />}
      </QuestionCard>
    </Container>
  );
};

export default QuestionScreen;