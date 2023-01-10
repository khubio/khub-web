/* eslint-disable object-curly-newline */
import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Slides.scss';

const Slides = ({ currentSlide, setCurrentSlide, slides, setSlides }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [slideContext, setSlideContext] = useState(null);
  const handleContextMenu = (event, key) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null,
    );
    setSlideContext(key);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const deleteSlide = (key) => {
    console.log(key);
    const newSlides = [...slides];
    for (let i = 0; i < slides.length; i += 1) {
      if (newSlides[i].key === key) {
        newSlides[i].isDeleted = true;
        break;
      }
    }
    console.log(newSlides);
    setSlides(newSlides);
    setContextMenu(null);
    setCurrentSlide(0);
  };

  const addNewSlide = () => {
    const emptySlide = {
      id: '',
      type: 'multipleChoice',
      question: 'Your question here',
      answers: [
        {
          id: Date.now() + 1,
          text: 'Option 1',
          status: false,
        },
        {
          id: Date.now() + 2,
          text: 'Option 2',
          status: false,
        },
        {
          id: Date.now() + 3,
          text: 'Option 3',
          status: false,
        },
        {
          id: Date.now() + 4,
          text: 'Option 4',
          status: false,
        },
      ],
      key: slides.length,
    };
    const newSlide = [...slides, emptySlide];
    setSlides(newSlide);
    setCurrentSlide(newSlide.length - 1);
  };
  return (
    <div className="slides">
      <Stack spacing={2}>
        <div className="slides__add-btn">
          <Button variant="contained" startIcon={<Add />} onClick={addNewSlide}>
            Add new slide
          </Button>
        </div>
        {slides.filter((slide) => !slide.isDeleted).map((slide, idx) => (
          <Box
            sx={{
              display: 'flex',
              cursor: 'context-menu',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 500,
                height: 128,
              },
            }}
            onContextMenu={(e) => handleContextMenu(e, slide.key)}
              // eslint-disable-next-line react/no-array-index-key
            key={idx}
          >
            <Paper
              className={
                      idx === currentSlide ? 'slide slide--active' : 'slide'
                    }
              onClick={() => {
                setCurrentSlide(idx);
              }}
            >
              {idx + 1}
            </Paper>
          </Box>
        ))}
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
                      contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                    }
        >
          <MenuItem onClick={handleClose}>Duplicate slide</MenuItem>
          <MenuItem onClick={handleClose}>Reset slide</MenuItem>
          <MenuItem disabled={slides.filter((slide) => !slide.isDeleted).length === 1} onClick={() => deleteSlide(slideContext)}>{slides.length === 1 ? 'Cannot delete all slides' : 'Delete slide'}</MenuItem>
        </Menu>
      </Stack>
    </div>
  );
};

export default Slides;
