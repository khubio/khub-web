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
} from '@services/presentation.service';
import { useMounted } from 'src/hooks/useMounted';
import SlideDemo from './SlideDemo';
import Slides from './Slides';
import SlideDetail from './SlideDetail';
import './Presentation.scss';
import Quiz from './SlideDemo/Quiz';

const initialSlideList = [
  {
    id: '',
    type: 'paragraph',
    question: 'Welcome to KHUB',
    description: 'Try your best experience with us',
    answers: [],
  },
];
// const initialSlideList = [
//   {
//     id: '',
//     type: 'multipleChoice',
//     question: 'Cau hoi so 1?',
//     description: 'Sample question 1',
//     answers: [
//       {
//         id: 1,
//         text: 'A',
//         status: false,
//       },
//       {
//         id: 2,
//         text: 'B',
//         status: false,
//       },
//       {
//         id: 3,
//         text: 'C',
//         status: true,
//       },
//       {
//         id: 4,
//         text: 'D',
//         status: false,
//       },
//     ],
//   },
//   {
//     id: '',
//     type: 'multipleChoice',
//     question: '1+1=?',
//     description: 'Lolo 2',
//     answers: [
//       {
//         id: 5,
//         text: '2',
//         status: false,
//       },
//       {
//         id: 6,
//         text: '3',
//         status: true,
//       },
//       {
//         id: 7,
//         text: '4',
//         status: false,
//       },
//       {
//         id: 8,
//         text: '5',
//         status: false,
//       },
//     ],
//   },
//   {
//     id: '',
//     type: 'heading',
//     question: 'Welcome to my presentation',
//     description: 'Lolopops 2',
//     answers: [],
//   },
//   {
//     id: '',
//     type: 'paragraph',
//     question: 'This is a paragraph',
//     description: 'Conchimnon 2',
//     answers: [],
//   },
// ];
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
    getPresentation(params.id).then((data) => setSlides(data.slides.map((slide, index) => {
      return { ...slide, key: index };
    })));
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleFullScreen = useFullScreenHandle();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePresent = () => {
    handleFullScreen.enter();
    setIsPresenting(true);
  };
  const totalSlides = slides.length;
  const handleOnSavePresentation = async () => {
    setLoading(true);
    await createSlides(
      params.id,
      slides.filter((slide) => slide.id === '') || [],
    );
    await deleteSlides(
      params.id,
      slidesDeleteId,
    );
    await updateSlides(
      params.id,
      slides.filter((slide) => slide.isUpdated && slide.id !== '') || [],
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
