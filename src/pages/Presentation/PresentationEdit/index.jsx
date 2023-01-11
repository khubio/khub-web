/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { PlayArrow, Share, Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicModal from '@components/Modal';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { io, Socket } from 'socket.io-client';
import {
  createSlides,
  deleteSlides,
  getPresentation,
  updateSlides,
  createAnswers,
  deleteAnswers,
  updateAnswers,
} from '@services/presentation.service';
import { useMounted } from 'src/hooks/useMounted';
import SlideDemo from './SlideDemo';
import Slides from './Slides';
import SlideDetail from './SlideDetail';
import './Presentation.scss';
import Quiz from './SlideDemo/Quiz';

const socket = io.connect('http://localhost:3000');

// const initialSlideList = [
//   {
//     id: '',
//     type: 'paragraph',
//     question: 'Welcome to KHUB',
//     description: 'Try your best experience with us',
//     answers: [],
//   },
// ];

const initialSlideList = [
  {
    id: '',
    type: 'paragraph',
    question: 'Welcome to KHUB',
    description: 'Try your best experience with us',
    answers: [],
  },
];
const PresentationEdit = () => {
  const params = useParams();
  const [slides, setSlides] = useState(initialSlideList);
  const [slidesDeleteId, setSlidesDeleteId] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isMounted } = useMounted();
  const fetch = useCallback(() => {
    getPresentation(params.id).then((data) =>
      setSlides(
        data.slides.map((slide, index) => {
          return { ...slide, key: index };
        }),
      ),
    );
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (isPresenting) {
      socket.emit('sendCurrentSlide', slides[currentSlide]);
    }
  }, [socket, currentSlide]);

  const handleFullScreen = useFullScreenHandle();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePresent = () => {
    handleFullScreen.enter();
    setIsPresenting(true);
    socket.emit('sendCurrentSlide', slides[currentSlide]);
  };
  const totalSlides = slides.length;
  const handleOnSavePresentation = async () => {
    setLoading(true);
    await createSlides(
      params.id,
      slides.filter((slide) => slide.id === '') || [],
    );
    await deleteSlides(params.id, slidesDeleteId);
    await updateSlides(
      params.id,
      slides.filter((slide) => slide.isUpdated && slide.id !== '') || [],
    );

    const updateAnswersSlides = slides.filter(
      (slide) => slide.id !== '' && slide.isAnswersUpdated,
    );
    await Promise.all(
      updateAnswersSlides.map((slide) =>
        createAnswers(
          params.id,
          slide.id,
          slide.answers.filter(
            (answer) => answer.id === '' && !answer.isDeleted,
          ),
        ),
      ),
    );
    await Promise.all(
      updateAnswersSlides.map((slide) =>
        deleteAnswers(
          params.id,
          slide.id,
          slide.answers
            .filter((answer) => answer.id !== '' && answer.isDeleted)
            .map((answer) => answer.id),
        ),
      ),
    );
    await Promise.all(
      updateAnswersSlides.map((slide) =>
        updateAnswers(
          params.id,
          slide.id,
          slide.answers.filter(
            (answer) =>
              answer.id !== '' && !answer.isDeleted && answer.isUpdated,
          ),
        ),
      ),
    );
    setLoading(false);
  };

  return (
    <div className="presentation">
      {isPresenting ? (
        <SlideDemo
          isPresenting={isPresenting}
          setIsPresenting={setIsPresenting}
          slides={slides}
          setSlides={setSlides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      ) : (
        <>
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
              onClick={handlePresent}
            >
              Present
            </Button>
            <Button
              className="presentation__btn-item--present"
              color="success"
              variant="contained"
              startIcon={<Save />}
              onClick={handleOnSavePresentation}
            >
              {loading ? 'Saving...' : 'Save'}
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
                  setSlidesDeletedId={setSlidesDeleteId}
                />
              </Grid>
              <Grid item xs={isPresenting ? 12 : 7}>
                <SlideDemo
                  isPresenting={isPresenting}
                  setIsPresenting={setIsPresenting}
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
        </>
      )}
    </div>
  );
};

export default PresentationEdit;
