import { TextField } from '@mui/material';
import styled from 'styled-components';
export const StyledTextField = styled(TextField)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
