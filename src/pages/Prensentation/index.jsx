import { PlayArrow } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import './Presentation.scss';
import SlideDemo from './SlideDemo';
import SlideDetail from './SlideDetail';
import Slides from './Slides';

const slideList = [
  {
    question: 'Cau hoi so 1?',
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
  },
  {
    question: 'Cau hoi so 2?',
    options: [
      {
        content: 'Hanoi 2',
        isCorrect: true,
      },
      {
        content: 'Ho Chi Minh City 2',
        isCorrect: false,
      },
      {
        content: 'Da Nang 2',
        isCorrect: false,
      },
      {
        content: 'Hue 2',
        isCorrect: false,
      },
    ],
    expectedAnswerIdx: 1,
  },
];
const Presentation = () => {
  const [slides, setSlides] = useState(slideList);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  return (
    <div>
      <div className="presentation__btn">
        <img
          className="presentation__logo"
          src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
          alt="logo"
        />
        <Button color="primary" variant="contained" startIcon={<PlayArrow />}>
          Present
        </Button>
      </div>
      <div className="presentation__container">
        <Grid container>
          <Grid item xs={2}>
            <Slides
              currentSlide={currentSlide}
              slides={slides}
              setCurrentSlide={setCurrentSlide}
              setSlides={setSlides}
            />
          </Grid>
          <Grid item xs={7}>
            <SlideDemo
              content={slides[currentSlide]}
              slides={slides}
              setSlides={setSlides}
              currentSlide={currentSlide}
            />
          </Grid>
          <Grid item xs={3}>
            <SlideDetail
              setSlides={setSlides}
              content={slides[currentSlide]}
              setCurrentSlide={setCurrentSlide}
              currentSlide={currentSlide}
              totalSlides={totalSlides}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Presentation;
