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
import VerifyEmail from '@pages/VerifyEmail';
import GroupJoin from '@pages/GroupJoin';
import NotFound from '@pages/NotFound';
import Presentation from '@pages/Prensentation';
import Quiz from '@pages/Quiz';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  // return <Quiz />;
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="auth">
            <Route
              path="login"
              element={
                <PrivateLayout>
                  <Login />
                </PrivateLayout>
              }
            />
            <Route path="sign-up" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
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
            <Route path=":id">
              <Route
                index
                element={
                  <PrivateLayout>
                    <GroupDetails />
                  </PrivateLayout>
                }
              />
              <Route
                path="join"
                element={
                  <PrivateLayout>
                    <GroupJoin />
                  </PrivateLayout>
                }
              />
            </Route>
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
