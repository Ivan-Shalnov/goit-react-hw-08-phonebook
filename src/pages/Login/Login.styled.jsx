import { Paper, TextField } from '@mui/material';
import styled from 'styled-components';
export const Wrap = styled(Paper)`
  width: 30%;
  margin: 0 auto;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
