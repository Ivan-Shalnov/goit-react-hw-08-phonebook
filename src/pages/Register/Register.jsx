import { Form, Wrap } from './Register.styled';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { StyledTextField } from 'components/common.styled';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const formRef = useRef();

  const checkFieldsEqual = () => {
    const passwordValue = formRef.current.elements.password.value;
    const passwordConfirmValue = formRef.current.elements.passwordconfirm.value;
    setPasswordConfirmError(passwordValue !== passwordConfirmValue);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const { name, email, password, passwordconfirm } = e.currentTarget.elements;

    if (password.value !== passwordconfirm.value) {
      toast.warning('Passwords not equal');
      return;
    }
    dispatch(
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      })
    );
  };

  return (
    <Wrap elevation={3}>
      <Form onSubmit={handleFormSubmit} ref={formRef}>
        <StyledTextField
          label="Name"
          variant="standard"
          size="small"
          name="name"
          autoComplete="name"
          required
        />
        <StyledTextField
          label="E-mail"
          variant="standard"
          size="small"
          name="email"
          autoComplete="email"
          required
        />
        <StyledTextField
          label="Password"
          size="small"
          variant="standard"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <StyledTextField
          label="Retype password"
          size="small"
          variant="standard"
          name="passwordconfirm"
          type="password"
          autoComplete="new-password"
          required
          onChange={checkFieldsEqual}
          error={passwordConfirmError}
        />
        <Button variant="outlined" startIcon={<ExitToAppIcon />} type="submit">
          Register
        </Button>
      </Form>
    </Wrap>
  );
};
