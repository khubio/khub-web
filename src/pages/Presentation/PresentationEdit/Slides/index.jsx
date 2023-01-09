/* eslint-disable object-curly-newline */
import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import './Slides.scss';

const Slides = ({ currentSlide, setCurrentSlide, slides, setSlides }) => {
  const addNewSlide = () => {
    const emptySlide = {
      id: '',
      type: 'multipleChoice',
      question: 'Your question here',
      answers: [
        {
          id: Date.now() + 1,
          text: 'Option 1',
          status: false,
        },
        {
          id: Date.now() + 2,
          text: 'Option 2',
          status: false,
        },
        {
          id: Date.now() + 3,
          text: 'Option 3',
          status: false,
        },
        {
          id: Date.now() + 4,
          text: 'Option 4',
          status: false,
        },
      ],
    };
    const newSlide = [...slides, emptySlide];
    setSlides(newSlide);
    setCurrentSlide(newSlide.length - 1);
  };

  return (
    <div className="slides">
      <Stack spacing={2}>
        <div className="slides__add-btn">
          <Button variant="contained" startIcon={<Add />} onClick={addNewSlide}>
            Add new slide
          </Button>
        </div>
        {slides.map((slide, idx) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 128,
              },
            }}
          >
            <Paper
              className={idx === currentSlide ? 'slide slide--active' : 'slide'}
              onClick={() => {
                setCurrentSlide(idx);
              }}
            >
              {idx + 1}
            </Paper>
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default Slides;
