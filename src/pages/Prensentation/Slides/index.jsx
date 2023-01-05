/* eslint-disable object-curly-newline */
import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import './Slides.scss';

const Slides = ({ currentSlide, setCurrentSlide, slides, setSlides }) => {
  const addNewSlide = () => {
    const emptySlide = {
      question: '',
      options: [
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
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
              variant="outlined"
              elevation={3}
              rounded
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
