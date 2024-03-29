import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  // RENDER:
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="flex flex-col min-h-screen bg-main-pattern bg-no-repeat bg-cover bg-center md:px-36 text-white font-poppins text-lg">
        <div className="grid grid-cols-12 gap-4 px-0">
          <Navbar />
          <Outlet />
        </div>
        <footer className="text-xs text-pink mt-auto text-center mb-14">
          <p>A MOBCODERS creation.</p>
          <p>© 2024 Subtrackd. All rights reserved.</p>
        </footer>
      </div>
    </ClerkProvider>
  );
}
