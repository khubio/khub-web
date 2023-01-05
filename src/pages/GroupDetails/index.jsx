import { Box, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '@components/Header';
import { useState, useEffect, useCallback } from 'react';
import {
  getGroupById,
  inviteToGroupByEmail,
  deleteGroupById,
  getRoleInGroup,
  updateUserGroupById,
  deleteUserGroupById,
} from '@services/group.service';
import { useParams, useNavigate } from 'react-router-dom';
import { useMounted } from 'src/hooks/useMounted';
import RoleFilter from '@components/RoleFilter';
import { rolesInGroup } from '@constants/rolesInGroup';
import { validateEmail } from '@utils/validateUtil';
import { tokens } from '../../theme';
import InvitationDialog from './InvitationDialog';
import ErrorDialog from './ErrorDialog';
import ConfirmDialog from './ConfirmDialog';
import MenuAction from './MenuAction';

const GroupDetails = () => {
  const theme = useTheme();
  const [group, setGroup] = useState({
    name: '',
    id: '',
    users: [],
  });
  const [roles, setRoles] = useState(rolesInGroup);
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [infoEmail, setInfoEmail] = useState({
    type: 'error',
    message: '',
  });
  const [openError, setOpenError] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
  const { isMounted } = useMounted();
  const params = useParams();
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    try {
      const roleUser = await getRoleInGroup(params.id);
      const data = await getGroupById(params.id, roles);
      setRole(roleUser);
      setGroup(data);
    } catch (error) {
      if (error.code === 403) {
        setOpenError(true);
      } else if (error.code === 400) {
        navigate('/not-found');
      }
    }
  }, [isMounted, roles, role]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleChange = (event) => {
    const { value } = event.target;
    const chosenRoles = typeof value === 'string' ? value.split(',') : value;
    if (chosenRoles?.length) {
      setRoles(chosenRoles);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setEmail('');
    setOpen(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
    navigate('/');
  };

  const handleOpenDeleteGroup = () => {
    setOpenDeleteGroup(true);
  };

  const handleCloseDeleteGroup = () => {
    setOpenDeleteGroup(false);
  };

  const handleDeleteGroup = async () => {
    await deleteGroupById(params.id);
    setOpenDeleteGroup(false);
    navigate('/groups');
  };

  const setErrorEmail = (message) => {
    setInfoEmail({
      type: 'error',
      message,
    });
  };

  const setSuccessEmail = (message) => {
    setInfoEmail({
      type: 'success',
      message,
    });
  };

  const handleChangeEmail = (e) => {
    setErrorEmail('');
    setEmail(e.target.value);
  };

  const handleInvite = async () => {
    if (!email.trim().length) {
      setErrorEmail('Please input email');
      setTimeout(() => setErrorEmail(''), 2000);
    } else if (!validateEmail(email)) {
      setErrorEmail('Please input valid email!');
      setTimeout(() => setErrorEmail(''), 1500);
    } else {
      try {
        await inviteToGroupByEmail(group.id, email);
        setSuccessEmail('Invited member by email');
        setEmail('');
        setTimeout(() => setSuccessEmail(''), 2000);
      } catch (error) {
        setErrorEmail(error.message);
        setTimeout(() => setErrorEmail(''), 2000);
      }
    }
  };

  const handleUpdateRole = async (userId, updatedRole) => {
    await updateUserGroupById(group.id, { userId, role: updatedRole });
    fetch();
  };

  const handleKickOutGroup = async (userId) => {
    await deleteUserGroupById(group.id, { userId });
    fetch();
  };

  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'User Id', flex: 1 },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { role: userRole, id: user } }) => {
        return (
          <Box
            width="30%"
            m="5px"
            p="5px"
            display="flex"
            // backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
          >
            {role === 'owner' && userRole !== 'owner' && (
              <MenuAction
                role={userRole}
                user={user}
                onUpdateRole={handleUpdateRole}
                onKickOut={handleKickOutGroup}
              />
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="GROUP DETAILS" subtitle={`Group name: ${group.name}`} />
      <Box display="flex" justifyContent="space-between" sx={{ p: '0' }}>
        <RoleFilter roles={roles} onChange={handleChange} />
        {role === 'owner' && (
          <>
            <Box display="flex" justifyContent="flex-end" sx={{ p: '0' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleOpenDeleteGroup()}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="info"
                sx={{ ml: '15px' }}
                onClick={() => handleOpen()}
              >
                Share
              </Button>
            </Box>
            <InvitationDialog
              open={open}
              onClose={handleClose}
              onInvite={handleInvite}
              email={email}
              onChangeEmail={handleChangeEmail}
              infoEmail={infoEmail}
            />
            <ConfirmDialog
              open={openDeleteGroup}
              onClose={handleCloseDeleteGroup}
              onOk={handleDeleteGroup}
              title="Are you sure to delete this group"
              subtitle="If you click AGREE, this group will delete permanently"
            />
          </>
        )}
      </Box>
      <ErrorDialog open={openError} onClose={handleCloseError} />

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
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus':
            {
              outline: 'none !important',
            },
        }}
      >
        <DataGrid checkboxSelection rows={group.users} columns={columns} />
      </Box>
    </Box>
  );
};

export default GroupDetails;
