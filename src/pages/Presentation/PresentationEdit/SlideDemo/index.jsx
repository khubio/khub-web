/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack } from '@mui/material';
import HeadingDemo from './HeadingDemo';
import MultipleChoiceDemo from './MultipleChoiceDemo';
import ParagraphDemo from './ParagraphDemo';
import Quiz from './Quiz';
import './SlideDemo.scss';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};
const renderSlideDemoByType = (
  isPresenting,
  slideContent,
  handleClickAnswer,
) => {
  const { type: slideType, question, answers, description } = slideContent;
  const chartData = slideContent.answers.map((answer) => {
    const { text, status } = answer;
    return {
      name: text,
      count: status ? Math.random() * 100 : 0,
    };
  });
  switch (slideType) {
    case 'multipleChoice':
      if (isPresenting) {
        return (
          <Quiz
            question={question}
            answers={answers}
            handleClickAnswer={handleClickAnswer}
            isPresenting={isPresenting}
          />
        );
      }
      return (
        <MultipleChoiceDemo
          question={question}
          answers={answers}
          handleClickAnswer={handleClickAnswer}
          chartData={chartData}
        />
      );
    case 'heading':
      return (
        <HeadingDemo
          heading={question}
          subheading={description}
          isPresenting={isPresenting}
        />
      );
    case 'paragraph':
      return (
        <ParagraphDemo
          heading={question}
          description={description}
          isPresenting={isPresenting}
        />
      );
    default:
      return <div>Please select type of presentation</div>;
  }
};
const SlideDemo = ({
  slides,
  setSlides,
  currentSlide,
  isPresenting,
  setCurrentSlide,
  setIsPresenting,
}) => {
  const slideContent = slides[currentSlide];
  const totalSlide = slides.length;
  const handleClickAnswer = (idx) => {
    const { question, answers } = slideContent;
    const newAnswers = [...answers];
    newAnswers[idx].status = !newAnswers[idx].status;
    setSlides((prev) => {
      const newSlides = [...prev];
      newSlides[currentSlide].answers = newAnswers;
      return newSlides;
    });
  };
  const handleClickNavigate = (direction) => {
    if (direction === 'next') {
      if (currentSlide < totalSlide - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    if (direction === 'prev') {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };
  return (
    <div className="demo">
      <Stack
        className={
          isPresenting
            ? 'demo__container demo__container--presenting'
            : 'demo__container'
        }
        direction={isPresenting ? 'row' : 'column'}
        minHeight={isPresenting ? '100vh' : 500}
      >
        {isPresenting && (
          <ArrowBackIcon
            sx={{
              width: 50,
              height: 50,
              ':hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => handleClickNavigate('prev')}
          />
        )}
        {renderSlideDemoByType(isPresenting, slideContent, handleClickAnswer)}
        {isPresenting && (
          <ArrowForwardIcon
            sx={{
              width: 50,
              height: 50,
              ':hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => handleClickNavigate('next')}
          />
        )}
      </Stack>
    </div>
  );
};

export default SlideDemo;
