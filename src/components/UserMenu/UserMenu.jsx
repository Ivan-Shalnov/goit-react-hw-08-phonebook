import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { Wrap } from './UserMenu.styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const onLogout = () => dispatch(logOut());
  return (
    <Wrap>
      <IconButton onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
      <span>Hello, {user.name}</span>
    </Wrap>
  );
};
