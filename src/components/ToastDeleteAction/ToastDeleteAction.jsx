import { Button } from '@mui/material';

export const ToastDeleteAction = ({ onCancel }) => {
  return (
    <div>
      Contact deleted <Button onClick={onCancel}>Cancel action</Button>
    </div>
  );
};
