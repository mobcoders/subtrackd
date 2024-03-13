import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    }
  });
  return (
    <div className="col-span-12">
      <div>
        <h1 className="text-5xl">Welcome to Subtrackd</h1>
        <p>Arjun's special app - his pride and joy.</p>
      </div>
    </div>
  );
}
