import { Box, Paper } from '@mui/material';

const ParagraphDemo = ({ heading, description, isPresenting }) => {
  return (
    <Box
      className={isPresenting ? 'demo__paragraph--presenting' : ''}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        '& > :not(style)': {
          mx: 8,
          p: 4,
          textAlign: 'center',
          minHeight: 100,
          maxWidth: '100%',
        },
      }}
    >
      <Paper className="demo__paragraph-heading" variant="outlined">
        {heading}
      </Paper>
      <p className="demo__paragraph-description">{description}</p>
    </Box>
  );
};

export default ParagraphDemo;
