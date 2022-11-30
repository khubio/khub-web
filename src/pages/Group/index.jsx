import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '@components/Header';
import { useState, useEffect } from 'react';
import { getGroupsOfUser } from '@services/group.service';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';

const Group = () => {
  const theme = useTheme();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getGroupsOfUser('63864c9c18cdab068be76dd2');
      setGroups(res);
    })();
  }, []);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Group Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="30%"
            m="5px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              <Link to={`/groups/${id}`}>Details</Link>
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="GROUP" subtitle="All group you have joined" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={groups} columns={columns} />
      </Box>
    </Box>
  );
};

export default Group;
