import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { decode } from 'html-entities';
import type { IQuestion } from "../../types";
import { useNavigate } from "react-router";

// https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple
export default function Question() {
  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [dataSource, setDataSource] = React.useState<IQuestion[]>([]);
  const [options, setOptions] = React.useState<string[]>([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple');
        const data = await res.json();
        const questionItem = data.results[questionIndex];
        const answers = [...questionItem.incorrect_answers]; // [1,2,3]
        answers.splice(Math.floor(Math.random() * 4), 0, questionItem.correct_answer)

        setOptions(answers);
        setDataSource(data.results);
      } catch (e) {
        console.log('fetch categories fails: ', e)
      }
    }
    fetchQuestions();
  }, []);

  // next question
  React.useEffect(() => {
    if (questionIndex === 0) return;

    // code with next question
    const questionItem = dataSource[questionIndex];
    const answers = [...questionItem.incorrect_answers];
    answers.splice(Math.floor(Math.random() * 4), 0, questionItem.correct_answer)
    setOptions(answers);
  }, [dataSource, questionIndex])

  function handleAnswer(option: string) {
    const questionItem = dataSource[questionIndex];
    
    if (option === questionItem.correct_answer) {
      setScore(prevState => prevState + 1)
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate('/final-score')
      return;
    }

    setQuestionIndex(prevState => prevState + 1)
  }

  console.log('questions: ', {
    questionIndex,
    question: dataSource[questionIndex]
  })

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Question {questionIndex + 1}
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        {decode(dataSource[questionIndex]?.question)}
      </Typography>
      <br />
      <Box>
        {options.map(option => (
            <>
              <Button key={option} variant="contained" fullWidth onClick={() => handleAnswer(option)}>{decode(option)}</Button>
              <br /> <br />
            </>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
        <Typography variant="body1" gutterBottom>
          Score: {score}/{dataSource.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Timer: xxx
        </Typography>
      </Box>
    </>
  )
}