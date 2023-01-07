/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Verified } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import './Quiz.scss';
import { Cell, Pie, PieChart } from 'recharts';

const content = {
  question:
    'Trên đồng cỏ có 6 con bò, đếm đi đếm lại chỉ có 12 cái chân. Câu hỏi tại sao?',
  answers: [
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
  answers: [
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
  expectedAnswerIdx: 1,
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  key,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${key}  ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const questionList = [content, content2, content, content2, content];
const getResultStatistic = (correctAnswerIdx, chosenAnswerIdx) => {
  let correct = 0;
  let wrong = 0;
  for (let i = 0; i < correctAnswerIdx.length; i += 1) {
    if (correctAnswerIdx[i] === chosenAnswerIdx[i]) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }
  return [
    { key: 'Correct', value: correct },
    { key: 'Wrong', value: wrong },
  ];
};
const Quiz = () => {
  const [chosenAnswerIdx, setChosenAnswerIdx] = useState([]);
  const [correctAnswerIdx, setCorrectAnswerIdx] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);
  const { question, answers } = currentQuestion;
  const [isFinished, setIsFinished] = useState(false);
  const [resultStatistic, setResultStatistic] = useState([]);
  const [finalPoint, setFinalPoint] = useState(0);
  const handleClickAnswer = async (idx) => {
    const newChosenAnswerIdx = [...chosenAnswerIdx, idx];
    const newCorrectAnswerIdx = [
      ...correctAnswerIdx,
      currentQuestion.expectedAnswerIdx,
    ];
    setChosenAnswerIdx(newChosenAnswerIdx);
    setCorrectAnswerIdx(newCorrectAnswerIdx);
    if (currentQuestionIdx === questionList.length - 1) {
      const result = getResultStatistic(
        newCorrectAnswerIdx,
        newChosenAnswerIdx,
      );
      setFinalPoint(
        parseInt((result[0].value / questionList.length) * 100, 10),
      );
      setResultStatistic(result);
      setIsFinished(true);
    } else {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setCurrentQuestion(questionList[currentQuestionIdx + 1]);
    }
  };

  return (
    <div className="quiz">
      {!isFinished ? (
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
              {answers.map(({ content: answer }, idx) => {
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
      ) : (
        <div className="quiz__result">
          <PieChart width={500} height={500}>
            <Pie
              width={300}
              height={300}
              className="quiz__result-chart"
              data={resultStatistic}
              dataKey="value"
              nameKey="name"
              outerRadius={200}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {resultStatistic.map(({ key, value }, index) => (
                <Cell fill={key === 'Correct' ? 'green' : 'red'} />
              ))}
            </Pie>
          </PieChart>
          <h2>
            Your Point
            <span className="quiz__result-point">{finalPoint}</span>
          </h2>
          <h3>
            {`You got ${resultStatistic[0].value} correct answers and ${resultStatistic[1].value} wrong answers`}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
