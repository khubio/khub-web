/* eslint-disable object-curly-newline */
import { Verified } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import './SlideDemo.scss';

const SlideDemo = ({ slides, setSlides, currentSlide }) => {
  const content = slides[currentSlide];
  const { question, options, expectedAnswerIdx: answerIdx } = content;
  const [expectedAnswerIdx, setExpectedAnswerIdx] = useState(answerIdx);
  const handleClickAnswer = (idx) => {
    setExpectedAnswerIdx(idx);
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].expectedAnswerIdx = idx;
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
            {options.map(({ content: answer }, idx) => {
              const isExpectedAnswer = idx === answerIdx;
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

export default SlideDemo;
