/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import { QuestionAnswer } from '@mui/icons-material';
import { Stack } from '@mui/material';
import socketIO from 'socket.io-client';
import HeadingDemo from '../PresentationEdit/SlideDemo/HeadingDemo';
import ParagraphDemo from '../PresentationEdit/SlideDemo/ParagraphDemo';
import Quiz from '../PresentationEdit/SlideDemo/Quiz';
import QuestionChatBoxWindow from './QuestionChatBoxWindow';
import './PresentationViewerScreen.scss';

// const socket = socketIO.connect('http://localhost:4000');

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
const PresentationViewerScreen = ({ slide, socket }) => {
  const handleClickAnswer = (idx) => {
    const { question, answers } = slide;
    const newAnswers = [...answers];
    newAnswers[idx].status = !newAnswers[idx].status;
  };
  return (
    <div className="demo">
      <Stack
        className="demo__container demo__container--presenting"
        direction="column"
        minHeight="100vh"
      >
        {renderSlideDemoByType(slide, handleClickAnswer)}
        <div>
          <QuestionChatBoxWindow socket={socket} />
        </div>
      </Stack>
    </div>
  );
};

export default PresentationViewerScreen;
