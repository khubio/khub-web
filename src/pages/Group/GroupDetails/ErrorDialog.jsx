import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ErrorDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>FORBIDDEN</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are not in this group, please return home page!.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px', justifyContent: 'flex-end' }}>
        <Button onClick={onClose} color="error" variant="contained">
          Go home
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
