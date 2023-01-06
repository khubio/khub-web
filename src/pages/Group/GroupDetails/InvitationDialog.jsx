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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

const InvitationDialog = ({
  open,
  onClose,
  onInvite,
  email,
  onChangeEmail,
  infoEmail,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite to join this group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To invite a person, please enter person email
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
      </DialogContent>
      {(!copied && !infoEmail.message) && (
        <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
          <CopyToClipboard text={`${window.location.href}/join`} onCopy={handleCopy}>
            <Button color="success" variant="outlined">
              Copy Link
            </Button>
          </CopyToClipboard>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button onClick={onInvite} color="info" variant="contained">
            Invite
          </Button>
        </DialogActions>
      )}
      {copied && <Alert severity="success">Link copied!</Alert>}
      {infoEmail.message && <Alert severity={infoEmail.type}>{infoEmail.message}</Alert>}
    </Dialog>
  );
};

export default InvitationDialog;
