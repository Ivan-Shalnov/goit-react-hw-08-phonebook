import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ redirectTo = '/', children }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return !shouldRedirect ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};
