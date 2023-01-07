/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Button, Checkbox, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ADJUST_ACTION } from '@constants/Presentation';

const MULTIPLE_CHOICE_MAPPER = {
  QUESTION: 'question',
  ANSWER: {
    TEXT: 'text',
    STATUS: 'status',
  },
};

const MultipleChoiceDetail = ({
  question,
  answers,
  handleContentChange,
  handleAnswerChange,
  handleAnswerListChange,
}) => {
  return (
    <>
      <Stack spacing={1} className="detail__question">
        <h4>Question</h4>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          multiline
          onChange={(e) => {
            handleContentChange(
              MULTIPLE_CHOICE_MAPPER.QUESTION,
              e.target.value,
            );
          }}
          value={question}
        />
      </Stack>
      <Stack spacing={1} className="detail__answers">
        {answers.map(({ text, status }, idx) => (
          <>
            <h4>Answer {idx + 1}</h4>
            <div className="detail__answers-item">
              <Checkbox
                checked={status}
                color="success"
                sx={{ width: '10%' }}
                onChange={(e) => {
                  handleAnswerChange(
                    MULTIPLE_CHOICE_MAPPER.ANSWER.STATUS,
                    e.target.checked,
                    idx,
                  );
                }}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ width: '80%' }}
                multiline
                size="small"
                onChange={(e) => {
                  handleAnswerChange(
                    MULTIPLE_CHOICE_MAPPER.ANSWER.TEXT,
                    e.target.value,
                    idx,
                  );
                }}
                value={text}
              />
              <RemoveCircleIcon
                className="detail__answers-item-remove"
                sx={{ width: '10%' }}
                onClick={() => {
                  handleAnswerListChange(ADJUST_ACTION.REMOVE, idx);
                }}
              />
            </div>
          </>
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
          handleAnswerListChange(ADJUST_ACTION.ADD);
        }}
        startIcon={<AddIcon />}
        sx={{ textTransform: 'none' }}
      >
        Add new answer
      </Button>
    </>
  );
};

export default MultipleChoiceDetail;
