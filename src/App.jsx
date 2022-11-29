/* eslint-disable react/jsx-wrap-multilines */
import Login from '@pages/Login';
import Register from '@pages/Register';
import Home from '@pages/Home';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Login />} />
          </Route>
          <Route
            path=""
            element={
              <PrivateLayout>
                <Group />
              </PrivateLayout>
            }
          />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
