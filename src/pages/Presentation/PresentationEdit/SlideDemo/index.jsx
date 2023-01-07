/* eslint-disable object-curly-newline */
import { Verified } from '@mui/icons-material';
import { Box, Grid, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './SlideDemo.scss';

const MultipleChoiceDemo = ({
  question,
  answers,
  handleClickAnswer,
  chartData,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 8,
            p: 1.5,
            minHeight: 128,
            width: 650,
          },
        }}
      >
        <Paper className="demo__question" variant="outlined" rounded>
          {question}
        </Paper>
      </Box>
      <Box sx={{ width: '100%' }}>
        {/* <Grid className="demo__answers" container rowSpacing={2}>
          {answers.map(({ id, text, status }, idx) => {
            const isExpectedAnswer = status;
            return (
              <Grid
                key={id}
                item
                xs={6}
                rounded
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 2.5,
                    width: 800,
                    ' min-height': 128,
                  },
                }}
              >
                <Paper
                  className={
                    isExpectedAnswer
                      ? 'demo__answer demo__answer--selected'
                      : 'demo__answer'
                  }
                  variant="outlined"
                  elevation={3}
                  rounded
                  onClick={() => handleClickAnswer(idx)}
                >
                  {isExpectedAnswer && (
                    <Verified className="demo__answer-icon" />
                  )}
                  <span>{text}</span>
                </Paper>
              </Grid>
            );
          })}
        </Grid> */}
        <ChartResultArea data={chartData} />
      </Box>
    </>
  );
};
const HeadingDemo = ({ heading, subheading }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          // m: 1,
          p: 1,
          'min-height': 128,
          width: 650,
          backgroundColor: 'transparent',
        },
      }}
    >
      <Paper className="demo__heading" rounded>
        {heading}
      </Paper>
      <p className="demo__heading--sub">{subheading}</p>
    </Box>
  );
};

const ParagraphDemo = ({ heading, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          p: 2,
          textAlign: 'center',
          'min-height': 100,
          width: 650,
        },
      }}
    >
      <Paper className="demo__paragraph-heading" variant="outlined" rounded>
        {heading}
      </Paper>
      <p className="demo__paragraph-description">{description}</p>
    </Box>
  );
};
const ChartResultArea = ({ data }) => {
  const barColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];
  return (
    <div className="chart__container">
      <ResponsiveContainer width="90%" height={350}>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tick={{ fill: 'white' }} stroke="white" />
          <YAxis tick={{ fill: 'white' }} stroke="white" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index * 10}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
const renderSlideDemoByType = (slideContent, handleClickAnswer) => {
  const { slideType, question, answers, description } = slideContent;
  const chartData = slideContent.answers.map((answer) => {
    const { text, status } = answer;
    return {
      name: text,
      count: status ? Math.random() * 100 : 0,
    };
  });
  switch (slideType) {
    case 'multipleChoice':
      return (
        <MultipleChoiceDemo
          question={question}
          answers={answers}
          handleClickAnswer={handleClickAnswer}
          chartData={chartData}
        />
      );
    case 'heading':
      return <HeadingDemo heading={question} subheading={description} />;
    case 'paragraph':
      return <ParagraphDemo heading={question} description={description} />;
    default:
      return <div>Not found</div>;
  }
};
const SlideDemo = ({ slides, setSlides, currentSlide }) => {
  const slideContent = slides[currentSlide];
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
  return (
    <div className="demo">
      <Stack className="demo__container" direction="column" minHeight={500}>
        {renderSlideDemoByType(slideContent, handleClickAnswer)}
      </Stack>
    </div>
  );
};

export default SlideDemo;
