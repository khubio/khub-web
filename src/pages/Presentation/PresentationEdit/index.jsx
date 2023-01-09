import { PlayArrow, Share, Save } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasicModal from '@components/Modal';
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

const initialSlideList = [
  {
    id: '',
    type: 'paragraph',
    question: 'Welcome to KHUB',
    description: 'Try your best experience with us',
    answers: [],
  },
];
// const slideList = [
//   {
//     id: '',
//     slideType: 'multipleChoice',
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
//     slideType: 'multipleChoice',
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
//     slideType: 'heading',
//     question: 'Welcome to my presentation',
//     description: 'Lolopops 2',
//     answers: [],
//   },
//   {
//     id: '',
//     slideType: 'paragraph',
//     question: 'This is a paragraph',
//     description: 'Conchimnon 2',
//     answers: [],
//   },
// ];
const PresentationEdit = () => {
  const params = useParams();
  const [slides, setSlides] = useState(initialSlideList);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const { isMounted } = useMounted();

  const fetch = useCallback(() => {
    getPresentation(params.id).then((data) => setSlides(data.slides));
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const totalSlides = slides.length;
  const handleOnSavePresentation = async () => {
    await createSlides(
      params.id,
      slides.filter((slide) => slide.id === '') || [],
    );
    await deleteSlides(
      params.id,
      slides.filter((slide) => slide.isDelete).map((slide) => slide.id) || [],
    );
    await updateSlides(
      params.id,
      slides.filter((slide) => slide.isUpdated) || [],
    );
  };
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
        <Button
          className="presentation__btn-item--present"
          color="success"
          variant="contained"
          startIcon={<Save />}
          onClick={handleOnSavePresentation}
        >
          Save
        </Button>
      </div>
      <div className="presentation__container">
        <Grid container>
          <Grid item xs={2}>
            <Slides
              currentSlide={currentSlide}
              slides={slides.filter((slide) => !slide.isDeleted)}
              setCurrentSlide={setCurrentSlide}
              setSlides={setSlides}
            />
          </Grid>
          <Grid item xs={7}>
            <SlideDemo
              content={slides[currentSlide]}
              slides={slides.filter((slide) => !slide.isDeleted)}
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

export default PresentationEdit;
