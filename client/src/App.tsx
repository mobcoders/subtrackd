import { ChakraProvider, CSSReset, GlobalStyle } from '@chakra-ui/react';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useStore } from './zustand/store.ts';
import Auth from './pages/auth.tsx';
import Dashboard from './pages/dashboard.tsx';

function App() {
  // ZUSTAND:
  const userID = useStore((state: { userId: 'string'; }) => state.userId);

  // RENDER:
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          {!userID ? (
            <>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
