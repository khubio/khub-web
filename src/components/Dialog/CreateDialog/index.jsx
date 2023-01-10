import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const CreateDialog = ({
  open, onClose, textValue, onChange, onCreate, title, content, label,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={label}
          type="text"
          fullWidth
          variant="filled"
          color="info"
          onChange={onChange}
          value={textValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onCreate} color="info">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
