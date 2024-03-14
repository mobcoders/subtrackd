import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layouts/root-layout';

// Import the components
import IndexPage from './routes';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import DashboardPage from './routes/dashboard';
import { NextUIProvider } from '@nextui-org/react';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      {
        element: <DashboardPage />,
        path: '/dashboard',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
);
