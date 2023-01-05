/* eslint-disable object-curly-newline */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PublicIcon from '@mui/icons-material/Public';
import { Button, Grid, Select } from '@mui/material';
import { MenuItem } from 'react-pro-sidebar';
import SharingMenuOption from '@components/SharingMenuOption';
import './SharingTabOption.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SharingTabOption() {
  const [value, setValue] = useState(0);
  const [sharingOption, setSharingOption] = useState(0);
  const [presentationLink, setPresentationLink] = useState(
    'https://www.mentimeter.com/app/presentation/al69j3z5f4jk4wiuyuii7y3mgkc1s4tm',
  );
  const [participationLink, setParticipationLink] = useState(
    'https://www.menti.com/al39cukv6j8z',
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCopy = (id) => {
    if (id === 'presentation') {
      navigator.clipboard.writeText(presentationLink);
    }
    if (id === 'participation') {
      navigator.clipboard.writeText(participationLink);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab roo label="Participation" {...a11yProps(0)} />
          <Tab label="Presentation sharing" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="participation">
          <div className="participation__permission">
            <div className="participation__permission-icon">
              <LockOpenIcon />
            </div>
            <div className="participation__permission-detail">
              <SharingMenuOption title="Who can join and vote on this presentation?" />
            </div>
          </div>
          <div className="participation__link">
            <input
              className="participation__link-url"
              id="participation"
              value={participationLink}
              readOnly
            />
            <Button
              className="participation__link-btn"
              id="participation"
              variant="contained"
              onClick={() => handleCopy('participation')}
              endIcon={<ContentCopyIcon />}
            />
          </div>
          <div className="participation__link-copy">Copied</div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="presentation">
          <div className="presentation__permission">
            <div className="presentation__permission-icon">
              <PublicIcon />
            </div>
            <div className="presentation__permission-detail">
              <SharingMenuOption title="Who can access this presentation ?" />
            </div>
          </div>
          <div className="presentation__link">
            <input
              className="presentation__link-url"
              id="presentation"
              value={presentationLink}
              readOnly
            />
            <Button
              className="presentation__link-btn"
              id="presentation"
              variant="contained"
              onClick={() => handleCopy('presentation')}
              endIcon={<ContentCopyIcon />}
            />
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
