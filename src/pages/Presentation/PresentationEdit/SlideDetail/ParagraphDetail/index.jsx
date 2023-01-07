/* eslint-disable react/jsx-one-expression-per-line */
import { Stack, TextField } from '@mui/material';
import React from 'react';

const PARAGRAPH_MAPPER = {
  HEADING: 'question',
  DESCRIPTION: 'description',
};
const ParagraphDetail = ({ heading, description, handleContentChange }) => {
  return (
    <Stack spacing={1} className="detail__heading">
      <h4>Heading</h4>
      <TextField
        className="detail__heading-input"
        id="outlined-basic"
        variant="outlined"
        fullWidth
        multiline
        minRows={2}
        size="medium"
        onChange={(e) => {
          handleContentChange(PARAGRAPH_MAPPER.HEADING, e.target.value);
        }}
        value={heading}
      />
      <h5>Paragraph</h5>
      <TextField
        className="detail__heading-input"
        id="outlined-basic"
        variant="outlined"
        fullWidth
        multiline
        minRows={7}
        size="medium"
        onChange={(e) => {
          handleContentChange(PARAGRAPH_MAPPER.DESCRIPTION, e.target.value);
        }}
        value={description}
      />
    </Stack>
  );
};

export default ParagraphDetail;
