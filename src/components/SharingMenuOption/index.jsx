import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import {
  getPresentation,
  changeAccessModifier,
} from '@services/presentation.service';
import { useParams } from 'react-router-dom';
import ConfirmDialog from '@components/Dialog/ConfirmDialog';

export default function SharingMenuOption({ title, sharingOptions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const params = useParams();
  const open = Boolean(anchorEl);

  useEffect(() => {
    getPresentation(params.id).then((data) => {
      if (data.accessModifier === 'public') {
        setSelectedIndex(0);
      } else if (data.accessModifier === 'private') {
        setSelectedIndex(1);
      } else {
        const index = sharingOptions.findIndex(
          (option) => option.group === data.group,
        );
        if (index > 1) {
          setSelectedIndex(index);
        } else {
          setSelectedIndex(0);
        }
      }
    });
  }, [sharingOptions]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    if (sharingOptions[index].group) {
      setDialogOpen(true);
    } else {
      await changeAccessModifier(
        params.id,
        sharingOptions[index].accessModifier,
        sharingOptions[index].group,
      );
      setAnchorEl(null);
    }
  };
  const handleOk = async (index) => {
    await changeAccessModifier(
      params.id,
      sharingOptions[index].accessModifier,
      sharingOptions[index].group,
    );
    setDialogOpen(false);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={title}
            secondary={(
              <Typography type="body2" style={{ color: 'blue' }}>
                {sharingOptions[selectedIndex]?.text}
              </Typography>
            )}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {sharingOptions.map((option, index) => (
          <MenuItem
            key={option.text}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.text}
          </MenuItem>
        ))}
        <ConfirmDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onOk={() => handleOk(selectedIndex)}
          title="Are you sure change access to group"
          subtitle="This action will stop another presentation in group"
        />
      </Menu>
    </div>
  );
}
