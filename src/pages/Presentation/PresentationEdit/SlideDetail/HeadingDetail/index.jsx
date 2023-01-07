/* eslint-disable react/jsx-one-expression-per-line */
import { Stack, TextField } from '@mui/material';
import React from 'react';

const HEADING_MAPPER = {
  HEADING: 'question',
  SUBHEADING: 'description',
};
const HeadingDetail = ({ heading, subheading, handleContentChange }) => {
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
          handleContentChange(HEADING_MAPPER.HEADING, e.target.value);
        }}
        value={heading}
      />
      <h5>Subheading</h5>
      <TextField
        className="detail__heading-input"
        id="outlined-basic"
        variant="outlined"
        fullWidth
        multiline
        minRows={5}
        size="medium"
        onChange={(e) => {
          handleContentChange(HEADING_MAPPER.SUBHEADING, e.target.value);
        }}
        value={subheading}
      />
    </Stack>
  );
};

export default HeadingDetail;
