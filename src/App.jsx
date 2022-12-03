/* eslint-disable react/jsx-wrap-multilines */
import Login from '@pages/Login';
import Register from '@pages/Register';
// import Home from '@pages/Home';
import ForgotPassword from '@pages/ForgotPassword';
import ResetPassword from '@pages/ResetPassword';
import PrivateLayout from '@layouts/PrivateLayout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import Group from '@pages/Group';
import GroupDetails from '@pages/GroupDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/slice/auth.slice';
import Profile from '@pages/Profile/Profile';
import ChangePassword from '@pages/ChangePassword';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Login key="login" />} />
          </Route>

          <Route
            path="/"
            element={
              <PrivateLayout>
                <Group />
              </PrivateLayout>
            }
          />

          <Route path="profile">
            <Route
              index
              element={
                <PrivateLayout>
                  <Profile />
                </PrivateLayout>
              }
            />
            <Route
              path="change-password"
              element={
                <PrivateLayout>
                  <ChangePassword />
                </PrivateLayout>
              }
            />
          </Route>

          <Route path="groups">
            <Route
              index
              element={
                <PrivateLayout>
                  <Group />
                </PrivateLayout>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateLayout>
                  <GroupDetails />
                </PrivateLayout>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
