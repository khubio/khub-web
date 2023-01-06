import { PlayArrow, Share } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import './Presentation.scss';
import BasicModal from '@components/Modal';
import SlideDemo from './SlideDemo';
import SlideDetail from './SlideDetail';
import Slides from './Slides';

const slideList = [
  {
    question: 'Cau hoi so 1?',
    options: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hue'],
    expectedAnswerIdx: [1, 2],
  },
  {
    question: 'Ai đẹp trai hơn?',
    options: ['Nam', 'Tín', 'Nguyen', 'Huy'],
    expectedAnswerIdx: [0],
  },
  {
    question: 'Laptop nào tốt hơn?',
    options: ['Macbook', 'Dell', 'Asus', 'HP'],
    expectedAnswerIdx: [3],
  },
];
const Presentation = () => {
  const [slides, setSlides] = useState(slideList);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const totalSlides = slides.length;
  return (
    <div>
      <div className="presentation__btn">
        <img
          className="presentation__logo"
          src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
          alt="logo"
        />
        <Button
          className="presentation__btn-item--share"
          color="secondary"
          variant="contained"
          onClick={handleOpen}
          startIcon={<Share />}
        >
          Share
        </Button>
        <BasicModal
          open={open}
          handleClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        />

        <Button
          className="presentation__btn-item--present"
          color="primary"
          variant="contained"
          startIcon={<PlayArrow />}
        >
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
              answerList={slides[currentSlide].expectedAnswerIdx}
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
