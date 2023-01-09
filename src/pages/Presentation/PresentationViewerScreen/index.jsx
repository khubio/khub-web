/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import { Stack } from '@mui/material';
import HeadingDemo from '../PresentationEdit/SlideDemo/HeadingDemo';
import ParagraphDemo from '../PresentationEdit/SlideDemo/ParagraphDemo';
import Quiz from '../PresentationEdit/SlideDemo/Quiz';
import './PresentationViewerScreen.scss';

const renderSlideDemoByType = (slideContent, handleClickAnswer) => {
  const { type: slideType, question, answers, description } = slideContent;
  switch (slideType) {
    case 'multipleChoice':
      return (
        <Quiz
          question={question}
          answers={answers}
          handleClickAnswer={handleClickAnswer}
          isPresenting
        />
      );
    case 'heading':
      return <HeadingDemo heading={question} subheading={description} />;
    case 'paragraph':
      return <ParagraphDemo heading={question} description={description} />;
    default:
      return <div>Please select type of presentation</div>;
  }
};
const PresentationViewerScreen = ({ slide }) => {
  const handleClickAnswer = (idx) => {
    const { question, answers } = slide;
    const newAnswers = [...answers];
    newAnswers[idx].status = !newAnswers[idx].status;
  };
  return (
    <div className="demo">
      <Stack
        className="demo__container demo__container--presenting"
        direction="row"
        minHeight="100vh"
      >
        {renderSlideDemoByType(slide, handleClickAnswer)}
      </Stack>
    </div>
  );
};

export default PresentationViewerScreen;
