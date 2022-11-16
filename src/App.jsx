import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { PublicLayout, PrivateLayout } from './layouts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => {
          const Page = route.component;
          return (
            <Route
              key={route.key}
              path={route.path}
              element={(
                <PublicLayout>
                  <Page />
                </PublicLayout>
              )}
            />
          );
        })}

        {privateRoutes.map((route) => {
          const Page = route.component;
          return (
            <Route
              key={route.key}
              path={route.path}
              element={(
                <PrivateLayout>
                  <Page />
                </PrivateLayout>
              )}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
