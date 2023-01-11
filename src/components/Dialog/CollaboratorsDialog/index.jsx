import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Alert,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getUser } from '@utils/localstorageUtil';

const CollaboratorsDialog = ({
  open,
  onClose,
  onInvite,
  email,
  onChangeEmail,
  infoEmail,
  collaborators,
  onRemove,
}) => {
  const isOwner = !collaborators.includes(getUser().email);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Collaborators of this presentation</DialogTitle>
      <DialogContent>
        {isOwner && (
          <>
            <DialogContentText>
              To add a person, please enter person email
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              color="info"
              onChange={(e) => onChangeEmail(e)}
              value={email}
            />
          </>
        )}
        <DialogContentText sx={{ mt: '40px', mb: '10px' }}>
          Collaborators
        </DialogContentText>
        {collaborators.map((collaborator) => {
          return (
            <div key={collaborator}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ width: '85%' }}
                multiline
                size="small"
                disabled
                value={collaborator}
              />
              {isOwner && (
                <RemoveCircleIcon
                  sx={{
                    width: '10%',
                    mt: '7px',
                    ml: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => onRemove(collaborator)}
                />
              )}
            </div>
          );
        })}
      </DialogContent>
      {!infoEmail.message && (
        <DialogActions sx={{ p: '16px 24px', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          {isOwner && (
            <Button onClick={onInvite} color="info" variant="contained">
              Add
            </Button>
          )}
        </DialogActions>
      )}
      {infoEmail.message && (
        <Alert severity={infoEmail.type}>{infoEmail.message}</Alert>
      )}
    </Dialog>
  );
};

export default CollaboratorsDialog;
