import { Box, Paper } from '@mui/material';

const HeadingDemo = ({ heading, subheading, isPresenting }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mx: 8,
          p: 3,
          textAlign: 'center',
          minHeight: 128,
          backgroundColor: 'transparent',
        },
      }}
      className={isPresenting ? 'demo__heading--presenting' : ''}
    >
      <Paper className="demo__heading">{heading}</Paper>
      <p className="demo__heading--sub">{subheading}</p>
    </Box>
  );
};

export default HeadingDemo;
