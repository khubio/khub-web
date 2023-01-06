/* eslint-disable object-curly-newline */
import { Verified } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import './SlideDemo.scss';

const SlideDemo = ({ slides, setSlides, currentSlide, answerList }) => {
  const slideContent = slides[currentSlide];
  const { question, options, expectedAnswerIdx } = slideContent;
  const handleClickAnswer = (idx) => {
    let newExpectedAnswerIdx;
    if (expectedAnswerIdx.includes(idx)) {
      newExpectedAnswerIdx = expectedAnswerIdx.filter((item) => item !== idx);
    } else {
      newExpectedAnswerIdx = [...expectedAnswerIdx, idx];
    }
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].expectedAnswerIdx = newExpectedAnswerIdx;
      return newSlides;
    });
  };
  return (
    <div className="demo">
      <Stack className="demo__container" direction="column">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 8,
              p: 1.5,
              height: 128,
              width: 650,
            },
          }}
        >
          <Paper className="demo__question" variant="outlined" rounded>
            {question}
          </Paper>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Grid className="demo__answers" container rowSpacing={2}>
            {options.map((option, idx) => {
              const isExpectedAnswer = expectedAnswerIdx.includes(idx);
              console.log('idx: ', idx);
              console.log('expectedAnswerIdx: ', expectedAnswerIdx);
              console.log(`${option} is expected answer: `, isExpectedAnswer);
              return (
                <Grid
                  item
                  xs={6}
                  rounded
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 2.5,
                      width: 800,
                      height: 128,
                    },
                  }}
                >
                  <Paper
                    className={
                      isExpectedAnswer
                        ? 'demo__answer demo__answer--selected'
                        : 'demo__answer'
                    }
                    variant="outlined"
                    elevation={3}
                    rounded
                    onClick={() => handleClickAnswer(idx)}
                  >
                    {isExpectedAnswer && (
                      <Verified className="demo__answer-icon" />
                    )}
                    {option}
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

export default SlideDemo;
