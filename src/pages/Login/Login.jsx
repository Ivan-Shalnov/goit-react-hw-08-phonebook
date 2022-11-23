import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Form, Wrap } from './Login.styled';
import { StyledTextField } from 'components/common.styled';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
export const LoginPage = () => {
  const dispatch = useDispatch();
  const handleFormSubmit = e => {
    e.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = e.target;
    dispatch(logIn({ email, password }));
  };
  return (
    <Wrap elevation={3}>
      <Form onSubmit={handleFormSubmit}>
        <StyledTextField
          label="E-mail"
          variant="standard"
          size="small"
          name="email"
          autoComplete="email"
        />
        <StyledTextField
          label="Password"
          size="small"
          variant="standard"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined" startIcon={<LoginIcon />} type="submit">
          Log-In
        </Button>
      </Form>
    </Wrap>
  );
};
