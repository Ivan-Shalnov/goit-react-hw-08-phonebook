import { ButtonGroup, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ButtonGroup disableElevation variant="contained">
        <Button onClick={() => navigate('/login')}>LogIn</Button>
        <Button onClick={() => navigate('/register')}>Register</Button>
      </ButtonGroup>
    </div>
  );
};
