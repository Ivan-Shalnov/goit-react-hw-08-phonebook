import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const RestrictedRoute = ({ redirectTo = '/', children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <>{children}</>;
};
