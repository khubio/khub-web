import { useState, useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from '@mui/material';
import SharingMenuOption from '@components/SharingMenuOption';
import './SharingTabOption.scss';
import { useParams } from 'react-router-dom';
import { getGroupsOfUser } from '@services/group.service';
import { rolesInGroup } from '@configs';

function TabPanel({
  children, value, index, ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export default function SharingTabOption() {
  const [value, setValue] = useState(0);
  const [sharingOptions, setSharingOptions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();
  useEffect(() => {
    getGroupsOfUser(rolesInGroup).then((data) => {
      const options = [{
        accessModifier: 'public',
        text: 'Anyone with link',
        group: null,
      }, {
        accessModifier: 'private',
        text: 'Close presentation',
        group: null,
      }];
      const groupOptions = data.map((group) => {
        return {
          accessModifier: 'group',
          text: `Anyone in your group: ${group.name}`,
          group: group.id,
        };
      });
      const newOptions = options.concat(groupOptions);
      setSharingOptions(newOptions);
    });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.host}/presentations/sharing/${params.id}`,
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Participation" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="participation">
          <div className="participation__permission">
            <div className="participation__permission-icon">
              <LockOpenIcon />
            </div>
            <div className="participation__permission-detail">
              <SharingMenuOption title="Who can join and vote on this presentation?" sharingOptions={sharingOptions} />
            </div>
          </div>
          <div className="participation__link">
            <input
              className="participation__link-url"
              value={`${window.location.host}/presentations/sharing/${params.id}`}
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
          <div className="participation__link-copy">
            {isCopied && <p>Copied</p>}
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
