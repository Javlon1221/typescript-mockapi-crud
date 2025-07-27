import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from './page/Layout';
import Home from './page/Home'; 

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

  return <>{routes}</>;
};

export default App;
