import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useStore } from './zustand/store.ts';
import Login from './pages/login.tsx';
import Dashboard from './pages/dashboard.tsx';

export default function App() {
  // ZUSTAND:
  const userID = useStore((state) => state.userId);

  // RENDER:
  return (
    <div className="grid grid-cols-12 px-0 mx-auto bg-dark-purple h-screen md:px-36">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {!userID ? (
            <Route path="*" element={<Navigate to="/" />} />
          ) : (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}
