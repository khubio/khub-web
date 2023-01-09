import Login from '@pages/Authentication/Login';
import Register from '@pages/Authentication/Register';
// import Home from '@pages/Home';
import ForgotPassword from '@pages/Authentication/ForgotPassword';
import ResetPassword from '@pages/Authentication/ResetPassword';
import PrivateLayout from '@layouts/PrivateLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import GroupList from '@pages/Group/GroupList';
import GroupDetails from '@pages/Group/GroupDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/slice/auth.slice';
import Profile from '@pages/Profile/Profile';
import ChangePassword from '@pages/Authentication/ChangePassword';
import VerifyEmail from '@pages/Authentication/VerifyEmail';
import GroupJoin from '@pages/Group/GroupJoin';
import NotFound from '@pages/NotFound';
import PresentationEdit from '@pages/Presentation/PresentationEdit';
import PresentationList from '@pages/Presentation/PresentationList';
import Quiz from '@pages/Presentation/PresentationEdit/SlideDemo/Quiz';

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
            <Route
              path="login"
              element={(
                <PrivateLayout>
                  <Login />
                </PrivateLayout>
              )}
            />
            <Route path="sign-up" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>
          <Route
            path="/"
            element={(
              <PrivateLayout>
                <GroupList />
              </PrivateLayout>
            )}
          />

          <Route path="profile">
            <Route
              index
              element={(
                <PrivateLayout>
                  <Profile />
                </PrivateLayout>
              )}
            />
            <Route
              path="change-password"
              element={(
                <PrivateLayout>
                  <ChangePassword />
                </PrivateLayout>
              )}
            />
          </Route>

          <Route path="groups">
            <Route
              index
              element={(
                <PrivateLayout>
                  <GroupList />
                </PrivateLayout>
              )}
            />
            <Route path=":id">
              <Route
                index
                element={(
                  <PrivateLayout>
                    <GroupDetails />
                  </PrivateLayout>
                )}
              />
              <Route
                path="join"
                element={(
                  <PrivateLayout>
                    <GroupJoin />
                  </PrivateLayout>
                )}
              />
            </Route>
          </Route>
          <Route path="presentations">
            <Route
              index
              element={(
                <PrivateLayout>
                  <PresentationList />
                </PrivateLayout>
              )}
            />
            <Route
              path=":id/edit"
              element={(
                <PrivateLayout>
                  <PresentationEdit />
                </PrivateLayout>
              )}
            />
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
