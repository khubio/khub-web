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
import Presentation from '@pages/Prensentation';
import Quiz from '@pages/Quiz';

function App() {
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem('profile'));
  // useEffect(() => {
  //   dispatch(setUser(user));
  // }, [dispatch, user]);

  return <Quiz />;
}

export default App;
