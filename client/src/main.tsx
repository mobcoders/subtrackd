import React from 'react';
import theme from './theme/theme';
import ReactDOM from 'react-dom/client';
import { CSSReset, ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
