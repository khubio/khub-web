/* eslint-disable object-curly-newline */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SharingTabOption from '@components/SharingTabOption';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  minHeight: '50vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginTop: '0.5rem',
              marginRight: '0.5rem',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={handleClose}
          />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Share
          </Typography>
          <SharingTabOption />
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
