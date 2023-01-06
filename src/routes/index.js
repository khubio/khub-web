import Login from '@pages/Authentication/Login';
import Register from '@pages/Authentication/Register';
import Groups from '@pages/Group/GroupList';
import GroupDetails from '@pages/Group/GroupDetails';
import Home from '@pages/Home';
import Profile from '@pages/Profile';

export const publicRoutes = [
  {
    path: '/login',
    key: 'login',
    component: Login,
  },
  {
    path: '/register',
    key: 'register',
    component: Register,
  },
];

export const privateRoutes = [
  {
    path: '/',
    key: 'home',
    component: Home,
  },
  {
    path: '/profile',
    key: 'profile',
    component: Profile,
  },
  {
    path: '/groups',
    key: 'groups',
    component: Groups,
  },
  {
    path: '/groups/:id',
    key: 'group-details',
    component: GroupDetails,
  },
];
