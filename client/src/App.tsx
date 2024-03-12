import { useStore } from './zustand/store.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/login/index.tsx';
import Dashboard from './pages/dashboard/index.tsx';

export default function App() {
  // ZUSTAND:
  const userID = useStore((state) => state.userId);

  // RENDER:
  return (
    <div className="bg-dark-purple h-screen md:px-36 text-white font-poppins text-lg background-effect">
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
