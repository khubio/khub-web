/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import SegmentIcon from '@mui/icons-material/Segment';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import {
  ADJUST_ACTION,
  DEFAULT_PRESENTATION_TYPE,
} from '@constants/Presentation';
import HeadingDetail from './HeadingDetail';
import MultipleChoiceDetail from './MultipleChoiceDetail';
import ParagraphDetail from './ParagraphDetail';
import './SlideDetail.scss';

const SlideDetail = ({
  content,
  currentSlide,
  setCurrentSlide,
  totalSlides,
  setSlides,
}) => {
  const [currentContent, setCurrentContent] = useState(content);
  const { type: slideTypeProp, question, answers, description } = content;
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
  const handleAnswerChange = (field, value, idx) => {
    const newAnswers = [...answers];
    newAnswers[idx][field] = value;
    newAnswers[idx].isUpdated = true;
    setCurrentContent((prev) => ({
      ...prev,
      answers: newAnswers,
    }));
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].answers = newAnswers;
      newSlides[currentSlide].isAnswersUpdated = true;

      return newSlides;
    });
  };
  const handleAnswerListChange = (action, idx = -1) => {
    const newAnswers = [...answers];
    if (action === ADJUST_ACTION.ADD) {
      newAnswers.push({ id: '', text: '', status: false });
    }
    if (action === ADJUST_ACTION.REMOVE) {
      // newAnswers.splice(idx, 1);
      newAnswers[idx].isDeleted = true;
    }
    setCurrentContent((prev) => ({
      ...prev,
      answers: newAnswers,
    }));
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].answers = newAnswers;
      newSlides[currentSlide].isAnswersUpdated = true;
      return newSlides;
    });
  };
  const handleContentChange = (field, value) => {
    setCurrentContent((prev) => ({ ...prev, [field]: value }));
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide][field] = value;
      newSlides[currentSlide].isUpdated = true;
      return newSlides;
    });
  };
  const handleSlideTypeChange = (event) => {
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].type = event.target.value;
      newSlides[currentSlide].isUpdated = true;
      return newSlides;
    });
  };

  const renderDetailBySlideType = (type) => {
    switch (type) {
      case 'multipleChoice':
        return (
          <MultipleChoiceDetail
            question={question}
            answers={answers}
            handleContentChange={handleContentChange}
            handleAnswerChange={handleAnswerChange}
            handleAnswerListChange={handleAnswerListChange}
          />
        );
      case 'heading':
        return (
          <HeadingDetail
            heading={question}
            subheading={description}
            handleContentChange={handleContentChange}
          />
        );
      case 'paragraph':
        return (
          <ParagraphDetail
            heading={question}
            description={description}
            handleContentChange={handleContentChange}
          />
        );
      default:
        return (
          <MultipleChoiceDetail
            question={question}
            answers={answers}
            handleContentChange={handleContentChange}
          />
        );
    }
  };

  return (
    <div className="detail">
      <div className="detail__container">
        <h4 className="detail__type-header" id="detail__type">
          Presentation type
        </h4>
        <Select
          className="detail__type-select"
          labelId="detail__type"
          id="demo-simple-select"
          value={slideTypeProp}
          defaultValue={DEFAULT_PRESENTATION_TYPE}
          label="Presentation type"
          onChange={handleSlideTypeChange}
        >
          <MenuItem value="heading">
            {' '}
            <TitleIcon className="detail__type-icon" /> Heading
          </MenuItem>
          <MenuItem value="paragraph">
            <SegmentIcon className="detail__type-icon" /> Paragraph
          </MenuItem>
          <MenuItem value="multipleChoice">
            {' '}
            <ControlPointDuplicateIcon className="detail__type-icon" /> Multiple
            choice
          </MenuItem>
        </Select>

        {renderDetailBySlideType(slideTypeProp)}

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
