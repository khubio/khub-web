import Login from '../pages/Login';
import Register from '../pages/Register';
import Groups from '../pages/Groups';
import GroupDetails from '../pages/GroupDetails';
import NewGroup from '../pages/NewGroup';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

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
  {
    path: '/groups/new',
    key: 'groups-new',
    component: NewGroup,
  },
];
