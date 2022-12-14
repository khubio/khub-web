/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Verified } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import './Quiz.scss';

const content = {
  question:
    'Trên đồng cỏ có 6 con bò, đếm đi đếm lại chỉ có 12 cái chân. Câu hỏi tại sao?',
  options: [
    {
      content: 'Hanoi',
      isCorrect: true,
    },
    {
      content: 'Ho Chi Minh City',
      isCorrect: false,
    },
    {
      content: 'Da Nang',
      isCorrect: false,
    },
    {
      content: 'Hue',
      isCorrect: false,
    },
  ],
  expectedAnswerIdx: 0,
};
const content2 = {
  question: 'Ai dep trai hon anh Thi?',
  options: [
    {
      content: 'BueDepTrai',
      isCorrect: true,
    },
    {
      content: 'NamDepTrai',
      isCorrect: false,
    },
    {
      content: 'Da Nang',
      isCorrect: false,
    },
    {
      content: 'Hue deo biet',
      isCorrect: false,
    },
  ],
  expectedAnswerIdx: 0,
};
const questionList = [content, content2, content, content2, content];
const Quiz = () => {
  const [chosenAnswerIdx, setChosenAnswerIdx] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[chosenAnswerIdx],
  );
  const isFinished = currentQuestionIdx === questionList.length;
  const { question, options } = questionList[currentQuestionIdx];
  const handleClickAnswer = (idx) => {
    if (isFinished) {
      console.log('Finished');
      console.log(chosenAnswerIdx);
      return;
    }
    setCurrentQuestionIdx((prev) => prev + 1);
    setChosenAnswerIdx((prev) => [...prev, idx]);
  };
  useEffect(() => {
    setCurrentQuestion(questionList[currentQuestionIdx]);
  }, [currentQuestionIdx]);
  return (
    <div className="quiz">
      <Stack className="quiz__container" direction="column">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 6,
              p: 2,
              height: 180,
              width: 1000,
            },
          }}
        >
          <Paper className="quiz__question" variant="outlined">
            {question}
          </Paper>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Grid className="quiz__answers" container rowSpacing={2}>
            {options.map(({ content: answer }, idx) => {
              return (
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 2,
                      width: 800,
                      height: 170,
                    },
                  }}
                >
                  <Paper
                    className={`quiz__answer quiz__answer--${idx}`}
                    variant="outlined"
                    onClick={() => handleClickAnswer(idx)}
                  >
                    {answer}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};

export default Quiz;
