/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import './SlideDetail.scss';

const SlideDetail = ({
  content,
  currentSlide,
  setCurrentSlide,
  totalSlides,
  setSlides,
}) => {
  const [currentContent, setCurrentContent] = useState(content);
  const { question, options } = content;
  const goToNextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === totalSlides - 1) return totalSlides - 1;
      return prev + 1;
    });
  };
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
  };
  const handleQuestionChange = (value) => {
    setCurrentContent((prev) => ({ ...prev, question: value }));
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].question = value;
      return newSlides;
    });
  };
  const handleAnswerChange = (value, idx) => {
    const newOptions = [...options];
    newOptions[idx].content = value;
    setCurrentContent((prev) => ({ ...prev, options: newOptions }));
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].options = newOptions;
      return newSlides;
    });
  };
  return (
    <div className="detail">
      <div className="detail__container">
        <Stack spacing={1} className="detail__question">
          <h4>Question</h4>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            multiline
            onChange={(e) => {
              handleQuestionChange(e.target.value);
            }}
            value={question}
          />
        </Stack>
        <Stack spacing={1} className="detail__answers">
          {options.map(({ content: answer }, idx) => (
            <>
              <h4>Option {idx + 1}</h4>
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                multiline
                value={answer}
                onChange={(e) => {
                  handleAnswerChange(e.target.value, idx);
                }}
              />
            </>
          ))}
        </Stack>

        <div className="detail__navigation">
          <Button
            className="detail__navigation-btn"
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={goToPreviousSlide}
          >
            Back
          </Button>
          <Button
            className="detail__navigation-btn"
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={goToNextSlide}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlideDetail;
