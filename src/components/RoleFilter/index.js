/* eslint-disable react/destructuring-assignment */
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const RoleFilter = ({ roles, onChange, allRoles }) => {
  return (
    <FormControl sx={{ m: 1, width: 200 }} variant="outlined" color="success">
      <InputLabel>Roles</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={roles}
        onChange={onChange}
        input={<OutlinedInput label="Roles" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {allRoles.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={roles.indexOf(name) > -1} color="success" />
            <ListItemText
              primary={name}
              primaryTypographyProps={{
                style: {
                  color: '#66bb6a',
                },
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleFilter;
