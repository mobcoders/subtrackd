import { Button, Image } from '@nextui-org/react';
import Notifications from './notifications';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

// RENDER:
export default function Navbar() {
  return (
    <div className="col-span-12 flex justify-between mt-12">
      <Link to="/">
        <Image
          width={150}
          alt="Subtrackd Logo"
          src="/subtrackd-logo.svg"
          className="rounded-none cursor-pointer"
        />
      </Link>
      <SignedIn>
        <div className="flex gap-3">
          <Notifications />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </SignedIn>
    </div>
  );
}
