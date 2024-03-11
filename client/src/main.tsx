import React from 'react';
// import theme from './theme/theme';
import ReactDOM from 'react-dom/client';
// import { CSSReset, ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
