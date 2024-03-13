import { Outlet } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navbar from '../components/navbar';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="bg-main-pattern bg-no-repeat bg-cover bg-center h-screen md:px-36 text-white font-poppins text-lg background-effect content-center">
        <div className='grid grid-cols-12 gap-4 px-0 mx-auto'>
        <Navbar />
        <Outlet />
        </div>
      </div>
    </ClerkProvider>
  );
}
