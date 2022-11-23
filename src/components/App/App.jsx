import { Navigate } from 'react-router';
import { ContactsPage } from 'pages/Contacts/Contacts';
import { LoginPage } from 'pages/Login/Login';
import { RegisterPage } from 'pages/Register/Register';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Layout } from 'components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from 'redux/auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isRefershing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  if (isRefershing) return <p>Loading</p>;
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/contacts" />}></Route>
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <RegisterPage />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <LoginPage />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <LoginPage />
            </RestrictedRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
