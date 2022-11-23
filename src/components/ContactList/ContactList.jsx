import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/operations';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { ToastDeleteAction } from 'components/ToastDeleteAction/ToastDeleteAction';
import {
  addToDeleteQueque,
  deleteFromDeleteQueque,
} from 'redux/contacts/slice';
const formatNumber = number =>
  number.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3');
const nameToInitials = name => {
  const splittedName = name.split(' ');
  let initials = splittedName[0][0];
  if (splittedName.length > 1) initials += splittedName[1][0];
  return initials.toUpperCase();
};
const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const deleteAction = id => {
    const toastId = Math.floor(Math.random() * 100000) + 1;
    const onCancel = () => {
      dispatch(deleteFromDeleteQueque(id));
      toast.dismiss(toastId);
    };
    const onDelete = () => {
      dispatch(deleteContact(id));
    };
    dispatch(addToDeleteQueque(id));

    toast.info(<ToastDeleteAction onCancel={onCancel} />, {
      toastId,
      onClose: onDelete,
    });
  };
  return visibleContacts.length > 0 ? (
    <TableContainer
      component={Paper}
      sx={{ width: '50%', margin: '45px auto' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={'40px'}></TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Number</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleContacts.map(({ name, number, id }) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Avatar>{nameToInitials(name)}</Avatar>
              </TableCell>

              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">{formatNumber(number)}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    deleteAction(id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Paper sx={{ width: 'fit-content', margin: '45px auto', padding: '45px' }}>
      <p>Nothing found</p>
    </Paper>
  );
};

export default ContactList;
